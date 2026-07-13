# Data Model: Reusable Wedding Landing Page

## Entities

### WeddingPage
Represents a public landing page for a specific wedding event.

**Fields**
- id: unique identifier
- title: display name for the page
- coupleName: primary names displayed on the page
- weddingDate: event date
- weddingTime: event time
- featuredImageUrl: image used as the hero visual
- templateId: reference to the reusable layout/template
- status: draft or published
- updatedAt: timestamp of last content change

### Template
Represents the reusable visual structure used by wedding pages.

**Fields**
- id: unique identifier
- name: template name
- layout: layout definition or component structure
- themeConfig: styling options such as colors and typography

### PageOwner
Represents the person who creates or updates the page.

**Fields**
- id: unique identifier
- name: owner display name
- email: contact information if needed
