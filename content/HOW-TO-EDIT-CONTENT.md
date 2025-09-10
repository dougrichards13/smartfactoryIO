# Content Editing Guide

## How to Edit Website Text (Non-Technical Team)

### Quick Start
1. Go to: https://github.com/dougrichards13/smartfactoryIO
2. Navigate to the `content/` folder
3. Click on the file you want to edit (e.g., `hero.json`)
4. Click the pencil icon ✏️ to edit
5. Make your changes
6. Click "Commit changes" at the bottom
7. The website will automatically update!

### Current Editable Content

#### Hero Section (`hero.json`)
**What you can change:**
- **Headline**: The big title at the top
- **Description**: The paragraph text
- **Tagline**: The highlighted blue text
- **Trust indicators**: The bullet points ($ amounts, years, etc.)
- **Button text**: The green button text

**Example edit:**
```json
{
  "headline": {
    "line1": "EXPERT CONSULTING FOR",
    "line2": "INDUSTRY LEADERS"
  },
  "description": "Your new description goes here...",
  "tagline": "Your new tagline in blue text",
  "trustIndicators": [
    "$10B+ Project Impact",
    "20+ Years Enterprise Focus", 
    "Fortune 500 Expertise"
  ],
  "ctaButton": {
    "text": "SCHEDULE YOUR CONSULTATION",
    "action": "contact"
  }
}
```

### Rules for Editing
✅ **DO:**
- Change any text in quotes
- Update numbers, years, amounts
- Modify button text
- Keep the same structure (commas, brackets, quotes)

❌ **DON'T:**
- Remove commas or brackets
- Delete quote marks
- Change field names (like "headline" or "description")
- Break the JSON structure

### Getting Help
- **Safe editing**: If you break something, previous versions are saved
- **Preview changes**: After committing, check https://smartfactory.io in a few minutes
- **Need help**: Contact the development team

### Future Sections
More sections will be added to this system:
- About section content
- Services descriptions  
- Team information
- Contact details

---

*This system lets you edit website content without touching code!*
