# Requirements Document

## Introduction

This feature enables persistent music playback across the portfolio site. Currently, the SoundCloud player is embedded within the `OtherProjectDetail` component and unmounts when the user navigates away, stopping playback. By lifting the player to App-level and adding a mini-player control, music continues playing seamlessly during navigation.

## Glossary

- **Music_Player**: The SoundCloud iframe widget rendered at App-level that handles audio playback
- **Mini_Player**: A small fixed-position circular button with animated equalizer bars that appears when music is playing
- **Equalizer_Bars**: Three to four vertical bars within the Mini_Player that animate vertically to indicate active playback
- **SoundCloud_Widget_API**: The SC.Widget JavaScript API used to control and observe the embedded SoundCloud iframe player
- **Music_Page**: The route `/other-projects/music` where the full SoundCloud player is displayed
- **Play_State**: A global boolean state tracking whether audio is currently playing

## Requirements

### Requirement 1: Persistent Playback Across Navigation

**User Story:** As a visitor, I want music to continue playing when I navigate to different pages, so that I can browse the portfolio without interrupting my listening experience.

#### Acceptance Criteria

1. WHILE the Music_Player iframe is mounted at App-level, THE Music_Player SHALL remain in the DOM across all route changes
2. WHEN a user navigates away from the Music_Page, THE Music_Player SHALL continue audio playback without interruption
3. THE Music_Player SHALL be visually hidden using CSS positioning (not `display:none`) when the user is not on the Music_Page
4. WHEN the user returns to the Music_Page, THE Music_Player SHALL be displayed in its full-size form within the page layout

### Requirement 2: Mini-Player Visibility

**User Story:** As a visitor, I want a mini-player button to appear when music is playing, so that I know audio is active and can control it from any page.

#### Acceptance Criteria

1. WHEN the SoundCloud_Widget_API reports a play event, THE Mini_Player SHALL become visible in a fixed position at the bottom-right corner of the viewport
2. WHEN no music has been played during the session, THE Mini_Player SHALL remain hidden
3. WHILE music is paused and has previously been played, THE Mini_Player SHALL remain visible with paused animation state
4. WHEN the SoundCloud_Widget_API reports a finish event and no track remains, THE Mini_Player SHALL become hidden

### Requirement 3: Equalizer Bar Animation

**User Story:** As a visitor, I want animated equalizer bars on the mini-player, so that I can visually tell whether music is playing or paused.

#### Acceptance Criteria

1. WHILE the Play_State is active, THE Equalizer_Bars SHALL animate vertically with varying heights to simulate an audio equalizer
2. WHILE the Play_State is paused, THE Equalizer_Bars SHALL freeze at their current height without animation
3. THE Equalizer_Bars SHALL consist of three to four vertical bars within the Mini_Player button

### Requirement 4: Play/Pause Toggle from Mini-Player

**User Story:** As a visitor, I want to pause and resume music from the mini-player button, so that I can control playback without returning to the music page.

#### Acceptance Criteria

1. WHEN a user clicks the Mini_Player while music is playing, THE SoundCloud_Widget_API SHALL pause playback
2. WHEN a user clicks the Mini_Player while music is paused, THE SoundCloud_Widget_API SHALL resume playback
3. WHEN playback is toggled via the Mini_Player, THE Play_State SHALL update to reflect the current playback status

### Requirement 5: Full Player on Music Page

**User Story:** As a visitor, I want the full SoundCloud player to display normally on the music page, so that my experience on that page remains unchanged.

#### Acceptance Criteria

1. WHEN the user is on the Music_Page, THE Music_Player SHALL render visually in the same location and style as the current implementation
2. WHEN the user is on the Music_Page, THE Music_Player SHALL maintain full width and 300px height styling
3. THE Music_Player SHALL use the existing SoundCloud embed URL pattern with the project's soundcloudUrl property

### Requirement 6: No Regression to Site Behavior

**User Story:** As a visitor, I want the rest of the site to work exactly as before, so that adding persistent music does not break navigation or page layouts.

#### Acceptance Criteria

1. WHEN the Music_Player is mounted at App-level, THE existing navigation and route transitions SHALL function without modification
2. THE Music_Player iframe SHALL not interfere with scroll behavior, pointer events, or layout of other page content when visually hidden
3. WHEN the Music_Player is visually hidden, THE Music_Player SHALL have zero height and be positioned off-screen or with `clip` to avoid affecting page flow

### Requirement 7: Styling and Theme Consistency

**User Story:** As a visitor, I want the mini-player to match the site's visual theme, so that it feels like a cohesive part of the portfolio.

#### Acceptance Criteria

1. THE Mini_Player SHALL use a purple-to-teal gradient background matching the site theme colors (#6D4B8A and #4A90A4)
2. THE Mini_Player SHALL display a subtle glow or box-shadow effect
3. THE Mini_Player SHALL be a circular button with dimensions appropriate for a small fixed control (approximately 48-56px diameter)
