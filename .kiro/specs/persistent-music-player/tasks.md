# Implementation Plan: Persistent Music Player

## Overview

Lift the SoundCloud iframe to App-level with a React context for playback state, add a mini-player button with animated equalizer bars, and conditionally show/hide the full player based on the current route.

## Tasks

- [ ] 1. Create MusicPlayerContext and Provider
  - [ ] 1.1 Create `src/context/MusicPlayerContext.jsx` with context and provider
    - Define context with `isPlaying`, `hasStarted`, `toggle`, and `iframeRef`
    - Provider manages state and exposes toggle function
    - Initialize SoundCloud Widget API (SC.Widget) from iframe ref
    - Subscribe to PLAY, PAUSE, FINISH events to update state
    - Guard widget initialization with `window.SC` check
    - _Requirements: 2.1, 2.2, 2.4, 4.1, 4.2, 4.3_

  - [ ]* 1.2 Write property test for toggle behavior
    - **Property 5: Toggle inverts play state**
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [ ]* 1.3 Write property test for mini-player visibility logic
    - **Property 3: Mini-player visibility reflects hasStarted**
    - **Validates: Requirements 2.1, 2.2, 2.3**

- [ ] 2. Create SoundCloudPlayer component
  - [ ] 2.1 Create `src/components/MusicPlayer/SoundCloudPlayer.jsx`
    - Render iframe with the SoundCloud embed URL pattern
    - Accept `isOnMusicPage` prop to control visible vs hidden styling
    - When visible: full width, 300px height, existing `.player` styling
    - When hidden: `position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0); overflow: hidden; pointer-events: none`
    - Attach `iframeRef` from context to the iframe element
    - _Requirements: 1.1, 1.3, 5.1, 5.2, 5.3, 6.2, 6.3_

  - [ ]* 2.2 Write property test for hidden player CSS
    - **Property 2: Hidden player CSS correctness**
    - **Validates: Requirements 1.3, 6.2, 6.3**

  - [ ]* 2.3 Write property test for SoundCloud URL construction
    - **Property 6: SoundCloud URL construction**
    - **Validates: Requirements 5.3**

- [ ] 3. Create MiniPlayer component with equalizer bars
  - [ ] 3.1 Create `src/components/MusicPlayer/MiniPlayer.jsx`
    - Consume MusicPlayerContext
    - Render only when `hasStarted` is true
    - Fixed position bottom-right (bottom: 24px, right: 24px)
    - Circular button ~50px diameter
    - Contains 3-4 span elements as equalizer bars
    - onClick calls `toggle()`
    - Use framer-motion for entrance/exit animation (AnimatePresence)
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 7.3_

  - [ ] 3.2 Create `src/components/MusicPlayer/MiniPlayer.module.scss`
    - Purple-to-teal gradient background (#6D4B8A to #4A90A4)
    - Box-shadow glow effect
    - Border-radius: 50%
    - Equalizer bar styles with CSS keyframe animation
    - Animation paused state via class toggle
    - _Requirements: 3.1, 3.2, 7.1, 7.2_

  - [ ]* 3.3 Write property test for equalizer animation state
    - **Property 4: Equalizer animation reflects isPlaying**
    - **Validates: Requirements 3.1, 3.2**

- [ ] 4. Integrate into App.jsx and update OtherProjectDetail
  - [ ] 4.1 Wrap App content with MusicPlayerProvider in `src/App.jsx`
    - Add SoundCloudPlayer component outside Routes
    - Add MiniPlayer component outside Routes
    - Use `useLocation` to determine if current route is the music page
    - Pass `isOnMusicPage` prop to SoundCloudPlayer
    - _Requirements: 1.1, 1.2, 1.4, 6.1_

  - [ ] 4.2 Update `src/components/OtherProjects/OtherProjectDetail.jsx`
    - Remove the inline SoundCloud iframe rendering
    - When on the music page, the App-level SoundCloudPlayer shows in full mode
    - Keep all other content (gallery, links, description) unchanged
    - _Requirements: 5.1, 6.1_

  - [ ]* 4.3 Write property test for iframe persistence across routes
    - **Property 1: Iframe persistence across routes**
    - **Validates: Requirements 1.1**

- [ ] 5. Load SoundCloud Widget API script
  - [ ] 5.1 Add SoundCloud Widget API script (`https://w.soundcloud.com/player/api.js`) to `index.html` or load it dynamically in the provider
    - Ensure script loads before widget initialization attempts
    - _Requirements: 4.1, 4.2_

- [ ] 6. Final checkpoint
  - Ensure all tests pass, ask the user if questions arise.
  - Verify music page still renders correctly
  - Verify navigation between pages does not cause errors
  - Verify mini-player appears/disappears based on play state

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The SoundCloud Widget API is loaded externally; widget initialization is guarded against unavailability
- All state is session-scoped (no persistence to localStorage needed)
- Property tests use fast-check with minimum 100 iterations
