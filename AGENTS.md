

# LedgerGuard – Agent Instructions



## Project Context



You are working on Ledgerly, a database-driven personal

finance web application.



The application allows users to manage income, expenses,

categories, monthly budgets, and financial dashboards.



Technology stack:

- Frontend: React, TypeScript, Vite

- Backend: Node.js, Express, TypeScript

- Database: SQLite with Prisma

- Validation: Zod

- Testing: Vitest



## Development Rules



1. Follow the existing project architecture and coding style.

2. Make small, focused changes. Avoid unrelated refactoring.

3. Use TypeScript and preserve type safety.

4. Validate user input on the backend.

5. Keep monetary values as integer cents.

6. Do not use floating-point arithmetic for stored money.

7. Income and expenses must be handled separately.

8. Expenses reduce remaining budgets; income does not.

9. Monthly calculations must use the correct month and year.

10. Preserve existing API contracts and database relationships.



## Verification Rules



After modifying application code:



1. Use the custom OpenCode tool `ledger_verify`.

2. Use mode `quick` for small changes and financial logic.

3. Use mode `full` for larger changes or final verification.

4. Read the structured verification results.

5. If a check fails, explain the failure and fix the cause.

6. Run verification again after fixing the code.

7. Never claim verification succeeded without a passing result.



Do not replace `ledger_verify` with a normal terminal command

when the custom tool is available.



## Safety Rules



- Do not delete or reset the production database.

- Do not modify `.env` files without explicit approval.

- Do not expose credentials or sensitive configuration.

- Do not install unnecessary dependencies.

- Do not modify files outside the project directory.

- Ask before performing destructive operations.



## Completion Requirements



Before finishing a coding task:



- Summarize the files changed.

- State which verification mode was used.

- Report the actual verification results.

- Mention unresolved errors or limitations.



Keep changes minimal and verifiable.




