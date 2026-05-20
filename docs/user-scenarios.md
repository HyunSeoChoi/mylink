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

Current version:

1. The owner logs in.
2. The owner opens the link management page.
3. The owner adds, edits, or deletes links.
4. The owner saves changes.
5. Visitors see the updated link list on the owner's `/username` page.

## Scenario 4: Owner Checks Responsive Design

1. The owner runs the development server.
2. The owner opens the page in a browser.
3. The owner checks desktop width.
4. The owner narrows the browser to mobile width.
5. The owner confirms that text, buttons, and the profile card do not overlap.

## Missing Features Found From Scenarios

- Vercel deployment will be needed before the public URL can be shared outside local development.

## Scenario 5: Owner Adds a Link With Firestore

1. The owner opens `/mypage`.
2. The owner logs in with Google.
3. The owner types a link title and URL.
4. The owner clicks the add button.
5. If either field is empty, the page shows a clear validation message.
6. If the URL is invalid, the page asks for a valid URL.
7. If validation passes, the new link is saved to the owner's Firestore path.
8. The input fields are cleared.
9. The new link appears in the list.
10. If the page is refreshed, the saved link is loaded again from Firestore.

## Scenario 6: Owner Edits a Link

1. The owner opens `/mypage`.
2. The owner logs in with Google.
3. The owner clicks the edit button on a link.
4. The link title and URL turn into input fields.
5. The owner changes the values.
6. If validation passes, Firestore is updated.
7. The link list shows the updated values.
8. If the page is refreshed, the edited values remain.

## Scenario 7: Owner Deletes a Link

1. The owner opens `/mypage`.
2. The owner logs in with Google.
3. The owner clicks the delete button on a link.
4. A confirmation modal shows the link title and warning message.
5. The owner can cancel to keep the link.
6. If the owner clicks delete, Firestore removes the link document.
7. The link disappears from the list.
8. If the page is refreshed, the deleted link stays removed.

## Scenario 8: Owner Logs Out

1. The owner opens `/mypage`.
2. The owner clicks the logout button.
3. The management form is hidden.
4. The page asks for Google login before links can be managed again.

## Scenario 9: Owner Edits Public Profile

1. The owner opens `/mypage`.
2. The owner logs in with Google.
3. The owner edits username, display name, and bio.
4. The owner saves the profile.
5. If the username is already used, the page shows an error.
6. If validation passes, the profile is saved to Firestore.
7. The public page link points to `/{username}`.

## Scenario 10: Visitor Opens a Username Page

1. A visitor opens `/{username}`.
2. The app finds the matching profile in Firestore.
3. The app loads that user's link list.
4. The visitor sees the profile name, bio, and links.
5. If the username does not exist, the page shows a 404-style message.

## Scenario 11: Visitor Clicks a Public Link

1. A visitor opens `/{username}`.
2. The visitor clicks a link.
3. The link opens in a new browser tab.
4. The app increments that link's `clickCount` in Firestore.
5. Multiple visitors clicking at the same time are counted safely.

## Scenario 12: Owner Checks Link Statistics

1. The owner opens `/mypage`.
2. The owner logs in with Google.
3. The owner checks the statistics section.
4. The page shows total clicks across all links.
5. The page shows each link's click count sorted from highest to lowest.
