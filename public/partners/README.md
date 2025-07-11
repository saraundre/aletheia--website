# Partners Logo Directory

This directory contains logo images for the "Trusted by" section on the About page.

## Current Partners

The following organizations are listed in the CollaboratorsCarousel component:

- Science Centre Singapore
- National Library Board
- Rakuten Asia
- Child Street 11
- Mom Don't Cry Foundation
- National University Singapore
- MakeIT at Libraries
- Robotic Games Society Singapore

## Image Guidelines

### File Naming Convention
- Use lowercase with hyphens for spaces
- Example: `science-centre-singapore.jpg`
- Example: `national-library-board.svg`

### Image Specifications
- **Format**: PNG or SVG preferred
- **Size**: Recommended 200x100px (2:1 aspect ratio)
- **Background**: Transparent or white
- **Quality**: High resolution for crisp display

### Folder Structure
```
public/partners/
├── README.md
├── science-centre-singapore.jpg
├── national-library-board-singapore.jpg
├── rakuten-asia.svg
├── child-at-street-11.png
├── mom-dont-cry-foundation.svg
├── national-university-singapore.png
├── MakeIT-at-Libraries.png
└── robotic-games-society-singapore.svg
```

## Usage

These images are referenced in the `CollaboratorsCarousel` component in `/app/about/page.tsx`. To use partner logos instead of placeholder initials, update the component to include image references.

## Adding New Partners

1. Add logo image to this directory following naming convention
2. Update the `collaborators` array in the `CollaboratorsCarousel` component
3. Ensure image follows the specifications above 