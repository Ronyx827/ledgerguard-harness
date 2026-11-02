# Target Software Specification
## Ledgerly – Personal Expense & Budget Tracker

**Project:** AI in Software Development – WS 2026/27  
**Domain:** Database-driven Web Applications  
**Target Software:** Ledgerly  
**Coding Agent:** OpenCode  
**Custom Harness:** LedgerGuard

## 1. Project Overview

Ledgerly is a database-driven web application designed to help individuals manage their personal finances.

Users can record income and expenses, organize transactions into categories, set monthly spending limits, and monitor their financial situation through an interactive dashboard.

The application serves as the target software for the custom OpenCode harness, LedgerGuard.

The coding agent is expected to extend and maintain the existing application rather than rebuild it from scratch.

## 2. Target Users

Ledgerly is intended for individuals who want to:

- Track income and expenses.
- Understand their monthly spending.
- Organize transactions by category.
- Set and monitor spending budgets.
- View financial summaries and trends.

## 3. Functional Requirements

### FR1 – Transaction Management

Users must be able to create, view, edit, and delete income and expense transactions.

Each transaction contains:
- Description
- Amount
- Category
- Transaction type
- Date

### FR2 – Category Management

Transactions are organized into income and expense categories.

Categories can be displayed and managed through the application.

### FR3 – Monthly Budget Management

Users can assign monthly spending limits to expense categories.

The application calculates:
- Total monthly budget
- Monthly spending
- Remaining budget
- Budget status

Budget calculations must use the selected month and year.

### FR4 – Financial Dashboard

The dashboard displays:
- Monthly income
- Monthly expenses
- Remaining budget
- Savings rate
- Recent transactions
- Financial charts

### FR5 – Filtering and Navigation

Users can navigate between months and filter transactions by relevant criteria, including:
- Transaction type
- Category
- Date

### FR6 – Persistent Data Storage

Transactions, categories, and budgets must be stored in a database and remain available after restarting the application.

## 4. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express, TypeScript |
| Database | SQLite |
| ORM | Prisma |
| Validation | Zod |
| Testing | Vitest, Supertest |
| API | REST |
| Package management | npm workspaces |

## 5. Database Structure

The application uses three main database models.

### Category

Stores category information and distinguishes income and expense categories.

### Transaction

Stores:
- Transaction type
- Amount in integer cents
- Description
- Date
- Associated category

### Budget

Stores monthly spending limits associated with expense categories.

### Relationships

- Each transaction belongs to a category.
- Budgets are associated with categories and months.
- Transactions and budgets must reference valid categories.
- Database relationships must remain consistent.

## 6. Financial Business Rules

### BR1 – Monetary Precision

Monetary amounts must be stored and calculated using integer cents to avoid floating-point precision errors.

### BR2 – Transaction Validation

Transaction amounts must be valid, positive monetary values.

Invalid input must be rejected.

### BR3 – Budget Calculation

Remaining Budget = Monthly Budget − Monthly Expenses

Expenses reduce the available budget. Income is calculated separately.

### BR4 – Monthly Calculations

Financial summaries must use transactions belonging to the selected month and year.

Transactions from other months or years must not affect the selected month's calculations.

### BR5 – Overspending

The application must identify when spending exceeds a configured budget.

### BR6 – Data Integrity

Transactions and budgets must reference valid categories.

Database relationships must remain consistent after creating, updating, or deleting records.

## 7. Non-Functional Requirements

- Responsive and user-friendly interface.
- Reliable TypeScript type checking.
- Input validation and appropriate error handling.
- Persistent database storage.
- Automated tests for financial calculations and important API functionality.
- Maintainable frontend and backend architecture.
- Local execution on Windows.
- No external banking integration or payment processing required.

## 8. Quality Assurance

The existing project provides automated verification through:

- `npm run typecheck`
- `npm run test`
- `npm run build`

The LedgerGuard harness extends OpenCode with a custom tool named `ledger_verify`.

### Quick Mode

Runs:
- TypeScript verification.
- Server-side financial tests.
- Client-side money calculation tests.

### Full Mode

Runs:
- TypeScript verification.
- Complete automated test suite.
- Production build.

The tool returns structured results, including the status, duration, and output of each check.

Verification results must be inspected before the agent reports task completion.

## 9. Development Scope

The coding agent should extend and maintain the existing Ledgerly application rather than rebuild it from scratch.

Changes should:
- Follow the existing architecture.
- Preserve financial correctness.
- Maintain database consistency.
- Preserve existing API contracts unless a change is explicitly requested.
- Include appropriate verification.
- Avoid unrelated modifications.

### Out of Scope

Unless explicitly requested, the agent must not:
- Rebuild the application from scratch.
- Integrate banking providers or payment processors.
- Introduce authentication or multi-user functionality.
- Replace the database technology.
- Perform unrelated architecture refactoring.
- Delete existing financial records.
- Modify unrelated application features.

### Milestone Scope

**Milestone 1:** Demonstrate that OpenCode can complete a small coding task in Ledgerly and invoke the custom `ledger_verify` tool.

**Future milestones:** Extend LedgerGuard with additional domain-specific verification, automated correction workflows, evaluation tasks, and security controls.

## 10. General Acceptance Criteria

A development task is considered successfully verified when:

1. The requested functionality is implemented.
2. Relevant automated tests pass.
3. TypeScript checks pass.
4. The custom `ledger_verify` tool has been executed.
5. No unresolved verification failures are reported.
6. Changes remain within the requested scope.
7. The agent reports the files changed and actual verification results.

These criteria define the intended verification standard. The current Milestone 1 harness does not yet enforce every step automatically.

## 11. Example Feature Specification – Monthly Budget Status

This section provides a concrete, testable example of specification-driven development for an existing Ledgerly feature.

### 11.1 Goal

The application must correctly calculate the remaining amount and status of a monthly spending budget.

The expected behavior must be defined before the agent modifies the implementation.

### 11.2 Scope

Calculate budget status using:
- A monthly budget limit expressed in integer cents.
- Spending expressed in integer cents.

The calculation should return the remaining amount and indicate whether the budget has been exceeded.

### 11.3 Expected Behavior

- Remaining budget equals budget limit minus spending.
- Zero spending leaves the full budget available.
- Spending equal to the budget limit leaves zero remaining.
- Spending greater than the budget limit produces a negative remaining amount.
- Spending above the budget limit is identified as overspending.
- All monetary calculations use integer cents.

### 11.4 Acceptance Criteria

**AC1 – Zero Spending**

Given a monthly budget of 10,000 cents and spending of 0 cents:

- Remaining budget must equal 10,000 cents.
- Percentage used must equal 0%.
- The budget must not be marked as exceeded.

**AC2 – Partial Spending**

Given a monthly budget of 10,000 cents and spending of 4,000 cents:

- Remaining budget must equal 6,000 cents.
- Percentage used must equal 40%.
- The budget must not be marked as exceeded.

**AC3 – Exact Budget Limit**

Given a monthly budget of 10,000 cents and spending of 10,000 cents:

- Remaining budget must equal 0 cents.
- Percentage used must equal 100%.
- The budget must not be marked as exceeded.

**AC4 – Overspending**

Given a monthly budget of 10,000 cents and spending of 12,000 cents:

- Remaining budget must equal -2,000 cents.
- Percentage used must equal 120%.
- The budget must be marked as exceeded.

**AC5 – Monetary Precision**

Budget limits, spending, and remaining amounts must use integer cents.

**AC6 – Automated Verification**

After modifying the budget calculation or its tests:

- TypeScript checks must pass.
- Server-side financial tests must pass.
- Client-side money calculation tests must pass.
- The custom `ledger_verify` tool must be executed.

### 11.5 Out of Scope

- Redesigning the financial dashboard.
- Changing the database schema.
- Adding new transaction types.
- Implementing banking integrations.
- Modifying unrelated financial calculations.

### 11.6 Verification

Use `ledger_verify` in `quick` mode for focused changes to budget calculation logic or tests.

Use `full` mode for larger changes or final verification.

The agent must report the actual verification results and any unresolved failures.

### 11.7 Implementation Guidance

Before modifying the feature:

1. Inspect the existing `computeBudgetStatus` implementation.
2. Inspect the existing financial unit tests.
3. Compare current behavior against the acceptance criteria.
4. Implement only the requested change.
5. Add or update relevant tests.
6. Run the custom verification tool.
7. Report the outcome.

The acceptance criteria describe the intended behavior. They must not be reported as already verified without checking the existing implementation and test results.