# MyLink User Scenarios

## Scenario 1: Visitor Opens a Shared Profile

1. A visitor taps the MyLink URL from an Instagram profile or message.
2. The visitor lands on the MyLink profile page.
3. The visitor checks the profile name and introduction.
4. The visitor scans the available links.
5. The visitor taps the link they want to open.
6. The selected external page opens in a new tab.

## Scenario 2: Visitor Looks for Project Source Code

1. A visitor opens the MyLink page.
2. The visitor notices the GitHub Repository link.
3. The visitor taps the GitHub Repository item.
4. The visitor moves to the project's GitHub repository.

## Scenario 3: Owner Updates Profile Links

Current version:

1. The owner opens the project code.
2. The owner edits the link data in `src/app/page.tsx`.
3. The owner checks the page in the browser.
4. The owner commits and pushes the update to GitHub.

Future version:

1. The owner logs in.
2. The owner opens the link management page.
3. The owner adds, edits, deletes, or reorders links.
4. The owner saves changes.
5. Visitors see the updated link list.

## Scenario 4: Owner Checks Responsive Design

1. The owner runs the development server.
2. The owner opens the page in a browser.
3. The owner checks desktop width.
4. The owner narrows the browser to mobile width.
5. The owner confirms that text, buttons, and the profile card do not overlap.

## Missing Features Found From Scenarios

- A future admin page is needed for link management.
- Link data should eventually move out of hardcoded page code.
- URL validation will be needed before saving user-entered links.
- Authentication will be needed before personal link management.
