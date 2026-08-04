# Implementation Plan: Other Projects Page

## Overview

Transform the existing Projects section into a dedicated "Other Projects" page following the Blog component pattern. Most infrastructure exists — main work is creating the list component, adding categories to data, and rewiring routes/navigation.

## Tasks

- [x] 1. Create OtherProjectsList component
  - [x] 1.1 Create OtherProjectsList.jsx and styles
    - Create `src/components/OtherProjects/OtherProjectsList.jsx` (model after BlogList.jsx)
    - Create `src/components/OtherProjects/OtherProjects.module.scss` (copy Blog.module.scss pattern)
    - Import projects from data, group by category
    - Render category sections with headings, project cards linking to `/other-projects/:slug`
    - Use framer-motion staggerChildren and fadeIn animations
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 6.1_

- [x] 2. Add category field to project data
  - [x] 2.1 Update projects array in data.js
    - Add `category: 'Music'` to existing music project
    - Add placeholder projects for other categories (Art, etc.) to demonstrate structure
    - _Requirements: 4.1, 3.1, 3.3_

- [x] 3. Create OtherProjectDetail component
  - [x] 3.1 Create OtherProjectDetail.jsx and styles
    - Create `src/components/OtherProjects/OtherProjectDetail.jsx` (adapt existing ProjectDetail.jsx)
    - Create `src/components/OtherProjects/OtherProjectDetail.module.scss`
    - Update back link to go to `/other-projects` instead of `/`
    - Add image gallery rendering when `gallery` array exists
    - _Requirements: 4.2, 4.3, 4.4, 5.2_

- [x] 4. Update routing in App.jsx
  - [x] 4.1 Wire up new routes
    - Change `/projects` from `<Home />` to `<OtherProjectsList />`
    - Change `/projects/:slug` from `<ProjectDetail />` to `<OtherProjectDetail />`
    - Add redirect from old `/projects` paths if needed for backward compatibility
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 5. Update navigation and clean up Home
  - [x] 5.1 Update Header navigation
    - Change "Projects" label to "Other Projects" in navLinks array
    - Update `to` path to '/other-projects' (or keep as '/projects' — your call)
    - Remove targetId (no longer a scroll target on Home)
    - Update "already here" message
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 5.2 Remove Projects section from Home page
    - Remove `import Projects` from Home.jsx
    - Remove `<Projects />` from render
    - _Requirements: 7.1, 7.2_

- [x] 6. Verification checkpoint
  - Manually test: navigation, list page, detail pages, back links
  - Verify responsive behavior on mobile

## Notes

- Existing ProjectDetail.jsx and Projects.jsx can be deleted after new components are verified
- Route can stay as `/projects` or change to `/other-projects` — either works, just update nav accordingly
- Most of the detail page logic already exists in ProjectDetail.jsx — just needs path updates
