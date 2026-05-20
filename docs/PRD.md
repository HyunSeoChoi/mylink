# MyLink PRD

## Project Overview

- Project name: MyLink
- Purpose: Collect a personal profile and frequently used links on one shareable page.
- Target users: Students, creators, job seekers, and anyone who wants to share several links from one profile URL.
- Current goal: Build a polished, deploy-ready MyLink service with shareable usernames, click statistics, and social preview metadata.

## Core Value

MyLink helps visitors quickly understand who the owner is and move to the owner's important external pages, such as Instagram, blog, portfolio, and GitHub.

## Feature List

### Required

- Show a profile section with name, short introduction, and profile image area.
- Show a vertical list of links.
- Render the link list from dummy link data.
- Provide a `/mypage` management page for adding links.
- Validate empty title, empty URL, and invalid URL input before adding links.
- Store newly added links in Firestore.
- Let the owner log in with Google before managing links.
- Load saved links from `users/{userId}/links`.
- Store profile data in `users/{userId}/profile/main`.
- Store username ownership in `usernames/{username}`.
- Let the owner edit username, display name, and bio.
- Provide a public `/username` page that loads the matching profile and links.
- Count public link clicks with safe server-side increments.
- Show total clicks and link-by-link clicks in `/mypage`.
- Provide a root landing page for first-time visitors.
- Add SEO metadata, Open Graph metadata, dynamic OG images, and a sitemap.
- Keep Firestore reads public, owner data writes limited to the logged-in owner, and public writes limited to `clickCount` increments.
- Edit saved links with inline editing.
- Delete saved links after a confirmation modal.
- Open each link in a new browser tab.
- Keep the layout readable on mobile, tablet, and desktop screens.
- Keep the project version controlled with Git and pushed to GitHub.

### Later

- Submit the sitemap to search engines.
- Add drag-and-drop link ordering.
- Add custom profile image upload.
- Add daily click statistics charts.
- Add dark mode and custom themes.

## Detailed Requirements

### Profile Section

- Display the owner's name.
- Display a short one or two line introduction.
- Display a circular profile image area.
- Use bold, consistent styling that matches the current Neobrutalism design.

### Link List

- Each link item contains a title, short description, and URL.
- Link items are stacked vertically.
- Link items are large enough to tap comfortably on mobile.
- External links open with `target="_blank"`.

### Responsive Layout

- Mobile: use full available width with comfortable padding.
- Tablet: center the card and keep it narrower than the screen.
- Desktop: keep the profile card fixed around 400px wide.

## Non-Functional Requirements

- The page should load quickly as a static page.
- Text should not overlap or overflow on small screens.
- The UI should remain simple enough to extend in future weeks.
- The code should pass lint and production build checks.

## Success Criteria

- A visitor can identify the owner from the profile section.
- A visitor can click each link and move to the correct destination.
- The layout works on mobile and desktop.
- The project has planning docs, code, commits, and GitHub push history.
