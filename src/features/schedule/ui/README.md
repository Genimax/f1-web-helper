# Schedule Feature - Race Details Modal

## Overview

This feature extends the schedule table functionality by adding a detailed race information modal that appears when clicking on race rows.

## Components

### RaceDetailsModal

A modal component that displays comprehensive information about a selected race, including:

-   Circuit information (name, location, length, corners, laps)
-   Race date and time in user's timezone
-   Winner information (if race is completed)
-   Complete weekend schedule with all sessions

### SessionSchedule

A component that displays the weekend schedule with all F1 sessions:

-   Free Practice sessions (FP1, FP2, FP3)
-   Qualifying
-   Sprint Qualifying (if available)
-   Sprint Race (if available)
-   Main Race

Each session shows:

-   Session name and type
-   Date and time in user's timezone
-   Color-coded badges for different session types

## Features

### Interactive Elements

-   **Clickable rows**: Both desktop table rows and mobile cards are clickable
-   **Keyboard navigation**: Full keyboard support with Enter/Space keys
-   **Accessibility**: Proper ARIA labels and focus management

### Timezone Support

-   All times are automatically converted to user's local timezone
-   Timezone information is displayed in the modal
-   Consistent time formatting across all components

### Session Types

-   **Practice**: Blue badges for Free Practice sessions
-   **Qualifying**: Purple badges for Qualifying sessions
-   **Sprint**: Orange badges for Sprint sessions
-   **Race**: Green badges for the main race

## Usage

### Basic Implementation

```tsx
import { RaceDetailsModal } from "@/features/schedule/ui";

const [selectedRace, setSelectedRace] = useState<F1Race | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const handleRaceClick = (race: F1Race) => {
    setSelectedRace(race);
    setIsModalOpen(true);
};

<RaceDetailsModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    race={selectedRace}
/>;
```

### With Table Integration

```tsx
<Table
    columns={columns}
    data={races}
    onRowClick={handleRaceClick}
    // ... other props
/>
```

### With Mobile Cards

```tsx
<ScheduleMobileCard
    race={race}
    onClick={() => handleRaceClick(race)}
    // ... other props
/>
```

## Styling

### Modal Styling

-   Responsive design that works on all screen sizes
-   Smooth animations and transitions
-   Consistent with the app's design system
-   Backdrop blur effect for better focus

### Session Styling

-   Color-coded session types for easy identification
-   Hover effects for better interactivity
-   Mobile-optimized layout
-   Clear visual hierarchy

## Accessibility Features

-   Full keyboard navigation support
-   Screen reader friendly with proper ARIA labels
-   Focus management in modal
-   High contrast support
-   Semantic HTML structure

## Dependencies

-   React hooks for state management
-   Custom timezone utilities
-   Shared UI components (Modal, Table, MobileCard)
-   F1 API types for data structure
