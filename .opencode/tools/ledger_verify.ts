
import { tool } from "@opencode-ai/plugin";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

type CheckResult = {
  name: string;
  category: "technical" | "financial";
  command: string;
  passed: boolean;
  exitCode: number | null;
  durationMs: number;
  timedOut: boolean;
  output: string;
};

const TIMEOUT_MS = 120_000;
const MAX_OUTPUT_CHARS = 12_000;

// Only these predefined commands can be executed.
// The model cannot inject arbitrary shell commands.
const CHECKS = {
  typescript: {
    category: "technical" as const,
    command: "npm run typecheck",
  },
  server_finance: {
    category: "financial" as const,
    command:
      "npm run test --workspace @expense-tracker/server -- src/__tests__/finance.test.ts",
  },
  client_money: {
    category: "financial" as const,
    command:
      "npm run test --workspace @expense-tracker/client -- src/__tests__/money.test.ts",
  },
  all_tests: {
    category: "technical" as const,
    command: "npm run test",
  },
  build: {
    category: "technical" as const,
    command: "npm run build",
  },
};

function findProjectRoot(startDirectory: string): string {
  let current = path.resolve(startDirectory);

  while (true) {
    const packageFile = path.join(current, "package.json");

    if (existsSync(packageFile)) {
      try {
        const pkg = JSON.parse(
          readFileSync(packageFile, "utf8"),
        );

        const workspaces = pkg.workspaces;

        if (
          pkg.name === "personal-expense-budget-tracker" &&
          Array.isArray(workspaces) &&
          workspaces.includes("client") &&
          workspaces.includes("server")
        ) {
          return current;
        }
      } catch {
        // Continue searching parent directories.
      }
    }

    const parent = path.dirname(current);

    if (parent === current) {
      throw new Error(
        "Ledgerly project root not found. " +
          "Start OpenCode inside the Ledgerly project.",
      );
    }

    current = parent;
  }
}

function runCommand(
  projectRoot: string,
  name: string,
  category: "technical" | "financial",
  command: string,
): Promise<CheckResult> {
  return new Promise((resolve) => {
    const started = Date.now();
    let output = "";
    let timedOut = false;
    let settled = false;

    // All commands are predefined above, never model-supplied.
    const executable =
      process.platform === "win32" ? "cmd.exe" : "sh";

    const args =
      process.platform === "win32"
        ? ["/d", "/s", "/c", command]
        : ["-c", command];

    const child = spawn(executable, args, {
      cwd: projectRoot,
      env: {
        ...process.env,
        CI: "true",
      },
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    function append(chunk: Buffer | string) {
      if (output.length < MAX_OUTPUT_CHARS) {
        output += chunk.toString().slice(
          0,
          MAX_OUTPUT_CHARS - output.length,
        );
      }
    }

    child.stdout?.on("data", append);
    child.stderr?.on("data", append);

    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, TIMEOUT_MS);

    function finish(
      exitCode: number | null,
      error?: string,
    ) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);

      if (error) {
        append(error);
      }

      resolve({
        name,
        category,
        command,
        passed: exitCode === 0 && !timedOut,
        exitCode,
        durationMs: Date.now() - started,
        timedOut,
        output: output.trim(),
      });
    }

    child.on("error", (error) => {
      finish(null, error.message);
    });

    child.on("close", (code) => {
      finish(code);
    });
  });
}

export default tool({
  description:
    "LedgerGuard verification tool for Ledgerly. " +
    "Checks TypeScript, financial calculations, " +
    "automated tests and production build. " +
    "Returns structured results with failures. " +
    "Use after modifying application code.",

  args: {
    mode: tool.schema
      .enum(["quick", "full"])
      .describe(
        "quick: TypeScript and financial tests; " +
          "full: TypeScript, all tests and build",
      ),
  },

  async execute(args, context) {
    let projectRoot: string;

    try {
      projectRoot = findProjectRoot(context.directory);
    } catch (error) {
      return JSON.stringify(
        {
          tool: "ledger_verify",
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : String(error),
        },
        null,
        2,
      );
    }

    const selected =
      args.mode === "quick"
        ? [
            "typescript",
            "server_finance",
            "client_money",
          ]
        : ["typescript", "all_tests", "build"];

    const results: CheckResult[] = [];

    // Sequential execution avoids competing npm processes
    // and makes the output easier to interpret.
    for (const name of selected) {
      const check = CHECKS[
        name as keyof typeof CHECKS
      ];

      const result = await runCommand(
        projectRoot,
        name,
        check.category,
        check.command,
      );

      results.push(result);
    }

    const failed = results.filter(
      (result) => !result.passed,
    );

    const report = {
      tool: "ledger_verify",
      harness: "LedgerGuard",
      mode: args.mode,
      project: "Ledgerly",
      projectRoot,
      status:
        failed.length === 0 ? "passed" : "failed",
      summary: {
        total: results.length,
        passed: results.length - failed.length,
        failed: failed.length,
        durationMs: results.reduce(
          (sum, result) => sum + result.durationMs,
          0,
        ),
      },
      checks: results,
      failedChecks: failed.map((result) => ({
        name: result.name,
        command: result.command,
        output: result.output,
      })),
      recommendation:
        failed.length === 0
          ? "All selected checks passed."
          : "Inspect the failed checks, fix the " +
            "code and run ledger_verify again.",
    };

    return JSON.stringify(report, null, 2);
  },
});
