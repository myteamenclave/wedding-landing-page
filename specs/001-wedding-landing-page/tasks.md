# Tasks: Reusable Wedding Landing Page

**Input**: Design documents from `/specs/001-wedding-landing-page/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the project structure and baseline configuration for the wedding landing page feature.

- [ ] T001 Create the frontend and backend directory structure for the web application in frontend/src/, frontend/tests/, backend/src/, and backend/tests/
- [ ] T002 Initialize the web application project files and package configuration for the chosen frontend and backend stack
- [ ] T003 [P] Configure linting and formatting tooling for the frontend and backend codebases

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the core infrastructure required before implementing any user story.

- [ ] T004 Create shared configuration and environment handling for application settings in backend/src/config/
- [ ] T005 [P] Set up routing and page rendering structure for the public wedding page in backend/src/api/ and frontend/src/pages/
- [ ] T006 [P] Implement base models and validation helpers for wedding page content in backend/src/models/
- [ ] T007 Create image upload handling and storage integration in backend/src/services/
- [ ] T008 Configure error handling and basic logging for page creation and update flows in backend/src/

---

## Phase 3: User Story 1 - Create a wedding landing page for an event (Priority: P1) 🎯 MVP

**Goal**: Allow a user to create and publish a complete wedding landing page with event details and a featured image.

**Independent Test**: A user can create a page with names, date, time, and image, save it, and view the published landing page.

### Implementation for User Story 1

- [ ] T009 [P] [US1] Create the wedding page form UI and submission flow in frontend/src/components/wedding-form.tsx
- [ ] T010 [P] [US1] Implement the public wedding page view in frontend/src/pages/wedding-page.tsx
- [ ] T011 [US1] Implement the create/update wedding page API endpoint in backend/src/api/wedding-pages.ts
- [ ] T012 [US1] Implement wedding page service logic for create, validate, and publish operations in backend/src/services/wedding-page-service.ts
- [ ] T013 [US1] Add validation for required fields, date/time, and image upload in backend/src/models/wedding-page.ts
- [ ] T014 [US1] Persist wedding page data and return the generated public URL in backend/src/services/wedding-page-repository.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Reuse the same design for multiple weddings (Priority: P2)

**Goal**: Enable the same reusable template to be used for multiple wedding pages with different content.

**Independent Test**: A user can create a second wedding page that uses the same layout and visual structure as the first, but with different content.

### Implementation for User Story 2

- [ ] T015 [P] [US2] Create a reusable template component for the shared wedding page layout in frontend/src/components/wedding-template.tsx
- [ ] T016 [US2] Implement template selection and content binding for multiple wedding pages in frontend/src/services/template-service.ts
- [ ] T017 [US2] Add backend support for associating a wedding page with a template in backend/src/models/wedding-page.ts
- [ ] T018 [US2] Ensure the public page renders the selected template with event-specific content in backend/src/api/wedding-pages.ts

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Update event details after publishing (Priority: P2)

**Goal**: Allow an existing wedding page to be updated after publication, including image and date/time changes.

**Independent Test**: A user can update the featured image, date, or time on a published page and see the new values on the public page.

### Implementation for User Story 3

- [ ] T019 [P] [US3] Add edit form support for changing wedding image, date, and time in frontend/src/components/edit-wedding-form.tsx
- [ ] T020 [US3] Implement update API handling for published wedding pages in backend/src/api/wedding-pages.ts
- [ ] T021 [US3] Implement update service logic and persistence changes in backend/src/services/wedding-page-service.ts
- [ ] T022 [US3] Add validation and error handling for invalid or unsupported updates in backend/src/models/wedding-page.ts

**Checkpoint**: At this point, all user stories should be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improve quality, validation, and overall readiness for demo and reuse.

- [ ] T023 [P] Add responsive styling and polish for the landing page experience in frontend/src/components/
- [ ] T024 [P] Add end-to-end quickstart validation flow for page creation, preview, and update in frontend/tests/ and backend/tests/
- [ ] T025 Review and refine documentation and usage notes in specs/001-wedding-landing-page/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational and may reuse US1 components
- **User Story 3 (P2)**: Can start after Foundational and may reuse US1 components

### Parallel Opportunities

- T003 can run in parallel with other setup tasks
- T005 and T006 can run in parallel during foundational work
- T009 and T010 can run in parallel for the first user story
- T015 and T016 can run in parallel for the second user story
- T019 can run in parallel with the update API and service work for the third user story

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the MVP independently before expanding into reuse and update flows

### Incremental Delivery

1. Complete Setup + Foundational to create the base experience
2. Deliver User Story 1 for the MVP
3. Extend with User Story 2 for reusable templates
4. Extend with User Story 3 for content updates after publication
