# Requirements Document

## Introduction

This feature transforms the existing "Projects" section into a dedicated "Other Projects" page, similar to how the "About" page works. The page will showcase the user's creative work beyond professional software development, including music, art, and other creative projects. The navigation will be updated to reflect the new naming and routing pattern.

## Glossary

- **Portfolio_Site**: The React-based portfolio website built with Vite
- **Other_Projects_Page**: A standalone page (separate from the home page) displaying creative projects
- **Project_Card**: A visual card component displaying a project's thumbnail, title, and subtitle
- **Project_Category**: A grouping of related projects (e.g., Music, Art, Photography)
- **Project_Detail_Page**: An individual page showing full details for a specific project
- **Navigation**: The header menu that allows users to navigate between site sections

## Requirements

### Requirement 1: Navigation Renaming

**User Story:** As a site visitor, I want the navigation to say "Other Projects" instead of "Projects", so that I understand these are creative side projects separate from professional case studies.

#### Acceptance Criteria

1. WHEN the navigation menu is displayed, THE Navigation SHALL show "Other Projects" as the label for the projects link
2. WHEN a user hovers over the "Other Projects" link, THE Navigation SHALL maintain the existing hover styling
3. WHEN a user is already on the Other Projects page and clicks the link, THE Navigation SHALL display the "already here" message

### Requirement 2: Dedicated Other Projects Page

**User Story:** As a site visitor, I want to access Other Projects as a separate dedicated page (like About), so that I can browse creative projects without scrolling through the entire home page.

#### Acceptance Criteria

1. WHEN a user navigates to /other-projects, THE Portfolio_Site SHALL render a dedicated page for Other Projects
2. WHEN the Other Projects page loads, THE Other_Projects_Page SHALL display a heading, subheading, and grid of project cards
3. THE Other_Projects_Page SHALL NOT be embedded within the Home page scroll
4. WHEN a user clicks on a project card, THE Other_Projects_Page SHALL navigate to the project's detail page

### Requirement 3: Project Categories

**User Story:** As a site visitor, I want to see projects organized by category (Music, Art, etc.), so that I can easily find the type of creative work I'm interested in.

#### Acceptance Criteria

1. THE Other_Projects_Page SHALL support multiple project categories (e.g., Music, Art, Photography, Writing)
2. WHEN displaying projects, THE Other_Projects_Page SHALL visually group or label projects by their category
3. WHEN a new project is added to the data file with a category, THE Other_Projects_Page SHALL automatically display it in the appropriate section

### Requirement 4: Expanded Project Data Structure

**User Story:** As the site owner, I want to add various types of creative projects with different media and links, so that I can showcase music, art, and other creative work appropriately.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support project data with category, title, subtitle, description, image, and optional media embeds
2. WHEN a project has a SoundCloud URL, THE Project_Detail_Page SHALL embed a SoundCloud player
3. WHEN a project has external links (Spotify, YouTube, etc.), THE Project_Detail_Page SHALL display them as clickable buttons
4. WHEN a project has a gallery of images, THE Project_Detail_Page SHALL display the images in a gallery format

### Requirement 5: Route and URL Structure

**User Story:** As a site visitor, I want clean URLs for the Other Projects page and individual projects, so that I can bookmark and share them.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL serve the Other Projects page at the /other-projects route
2. THE Portfolio_Site SHALL serve individual project detail pages at /other-projects/:slug routes
3. WHEN the old /projects route is accessed, THE Portfolio_Site SHALL redirect to /other-projects for backward compatibility
4. WHEN navigating between project detail pages and the main page, THE Navigation SHALL maintain correct active state indicators

### Requirement 6: Visual Consistency

**User Story:** As a site visitor, I want the Other Projects page to match the visual style of the rest of the site, so that the experience feels cohesive.

#### Acceptance Criteria

1. THE Other_Projects_Page SHALL use the same motion animations (framer-motion) as other site pages
2. THE Other_Projects_Page SHALL follow the existing color palette and typography
3. THE Other_Projects_Page SHALL be responsive and work on mobile, tablet, and desktop viewports
4. WHEN displaying project cards, THE Other_Projects_Page SHALL use the existing card hover effects and styling patterns

### Requirement 7: Home Page Cleanup

**User Story:** As the site owner, I want the Projects section removed from the home page, so that visitors are directed to the dedicated Other Projects page instead.

#### Acceptance Criteria

1. THE Home page SHALL NOT include the Projects section component
2. WHEN scrolling through the home page, THE Portfolio_Site SHALL skip from the Experience section to the Footer/Contact section
3. THE Navigation SHALL update scroll behavior to account for the removed section
