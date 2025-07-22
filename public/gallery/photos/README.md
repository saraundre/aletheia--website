# Gallery Photos

This directory contains photos for the gallery section of the Aletheia website.

## Folder Structure

```
public/gallery/photos/
├── README.md (this file)
├── events/          # Event photos
├── workshops/       # Workshop photos  
├── community/       # Community engagement photos
└── uploads/         # User uploaded photos (if applicable)
```

## Photo Guidelines

### Supported Formats
- **JPEG (.jpg, .jpeg)** - Recommended for photos
- **PNG (.png)** - For images requiring transparency
- **WebP (.webp)** - Modern format with better compression

### Recommended Specifications
- **Resolution:** Minimum 1200x800 pixels for good quality
- **File Size:** Keep under 2MB for optimal loading
- **Aspect Ratio:** 16:9 or 4:3 for consistency
- **Color Space:** sRGB for web compatibility

### Naming Convention
Use descriptive, lowercase names with hyphens:
- `stem-workshop-2024-01.jpg`
- `community-outreach-march-2024.png`
- `robot-parade-event-2024.webp`

### Organization
- Group photos by event, date, or category
- Use subdirectories for better organization
- Include metadata or description files if needed

## Usage in Gallery

Photos in this directory can be referenced in the gallery page using:
```jsx
<Image 
  src="/gallery/photos/your-photo.jpg"
  alt="Description of the photo"
  width={800}
  height={600}
/>
```

## Upload Process

When adding new photos:
1. Ensure photos meet the quality guidelines
2. Use appropriate naming convention
3. Place in the correct subdirectory
4. Update gallery page to include new photos
5. Add alt text and descriptions for accessibility

## Backup

Regular backups of this directory are recommended to preserve photo assets. 