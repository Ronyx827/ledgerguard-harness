\# Target Software Specification

\## Ledgerly – Personal Expense \& Budget Tracker



\*\*Project:\*\* AI in Software Development – WS 2026/27  

\*\*Domain:\*\* Database-driven Web Applications  

\*\*Target Software:\*\* Ledgerly  

\*\*Coding Agent:\*\* OpenCode  

\*\*Custom Harness:\*\* LedgerGuard



\### 1. Project Overview



Ledgerly is a database-driven web application designed to help individuals manage their personal finances.



Users can record income and expenses, organize transactions into categories, set monthly spending limits, and monitor their financial situation through an interactive dashboard.



The application serves as the target software for our custom OpenCode harness, LedgerGuard.



\### 2. Target Users



Individuals who want to:



\- Track their income and expenses.

\- Understand their monthly spending.

\- Organize transactions by category.

\- Set and monitor spending budgets.

\- View financial summaries and trends.



\### 3. Functional Requirements



\*\*FR1 – Transaction Management\*\*



Users must be able to create, view, edit, and delete income and expense transactions. Each transaction contains a description, amount, category, type, and date.



\*\*FR2 – Category Management\*\*



Transactions are organized into income and expense categories. Categories can be displayed and managed through the application.



\*\*FR3 – Monthly Budget Management\*\*



Users can assign monthly spending limits to expense categories. The application calculates the total budget, spending, and remaining amount for the selected month.



\*\*FR4 – Financial Dashboard\*\*



The dashboard displays monthly income, expenses, remaining budget, savings rate, recent transactions, and financial charts.



\*\*FR5 – Filtering and Navigation\*\*



Users can navigate between months and filter transactions by relevant criteria, including transaction type, category, and date.



\*\*FR6 – Persistent Data Storage\*\*



Transactions, categories, and budgets must be stored in a database and remain available after restarting the application.



\### 4. Technology Stack



| Component | Technology |

|---|---|

| Frontend | React, TypeScript, Vite |

| Backend | Node.js, Express, TypeScript |

| Database | SQLite |

| ORM | Prisma |

| Validation | Zod |

| Testing | Vitest, Supertest |

| API | REST |



\### 5. Database Structure



The application uses three main database models:



\- \*\*Category:\*\* Stores category information and distinguishes income and expense categories.

\- \*\*Transaction:\*\* Stores transaction type, amount in cents, description, date, and associated category.

\- \*\*Budget:\*\* Stores monthly spending limits associated with expense categories.



Each transaction belongs to a category. Budgets are associated with categories and months.



\### 6. Financial Business Rules



\*\*BR1 – Monetary Precision\*\*



Monetary amounts must be stored and calculated using integer cents to avoid floating-point precision errors.



\*\*BR2 – Transaction Validation\*\*



Transaction amounts must be valid, positive monetary values. Invalid input must be rejected.



\*\*BR3 – Budget Calculation\*\*



Remaining Budget = Monthly Budget − Monthly Expenses



Expenses reduce the available budget. Income is calculated separately.



\*\*BR4 – Monthly Calculations\*\*



Financial summaries must use transactions belonging to the selected month and year.



\*\*BR5 – Overspending\*\*



The application must identify when spending exceeds a configured budget.



\*\*BR6 – Data Integrity\*\*



Transactions and budgets must reference valid categories. Database relationships must remain consistent.



\### 7. Non-Functional Requirements



\- Responsive and user-friendly interface.

\- Reliable TypeScript type checking.

\- Input validation and appropriate error handling.

\- Persistent database storage.

\- Automated tests for financial calculations and important API functionality.

\- Maintainable frontend and backend architecture.

\- Local execution on Windows.

\- No external banking integration or payment processing required.



\### 8. Quality Assurance



The existing project provides automated verification through:



\- `npm run typecheck`

\- `npm run test`

\- `npm run build`



The LedgerGuard harness extends OpenCode with a custom tool named `ledger\_verify`.



\*\*Quick mode:\*\*



\- TypeScript verification.

\- Server-side financial tests.

\- Client-side money calculation tests.



\*\*Full mode:\*\*



\- TypeScript verification.

\- Complete automated test suite.

\- Production build.



The tool returns structured results, including the status, duration, and output of each check.



\### 9. Development Scope



The coding agent should extend and maintain the existing Ledgerly application rather than rebuild it from scratch.



Changes should follow the existing architecture, preserve financial correctness, maintain database consistency, and include appropriate verification.



For Milestone 1, the focus is demonstrating that OpenCode can complete a small coding task in Ledgerly and invoke the custom `ledger\_verify` tool.



Future milestones will extend LedgerGuard with additional domain-specific verification, automated correction workflows, evaluation tasks, and security controls.



\### 10. Acceptance Criteria



A development task is considered successfully verified when:



1\. The requested functionality is implemented.

2\. Relevant automated tests pass.

3\. TypeScript checks pass.

4\. The custom `ledger\_verify` tool has been executed.

5\. No unresolved verification failures are reported.



These criteria define the intended verification standard; the current Milestone 1 harness does not yet enforce every step automatically.

