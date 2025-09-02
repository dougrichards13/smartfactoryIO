# How to Update Website Metrics

## Quick Start (Non-Technical Team Members)

### To Update Metrics:
1. Open the file: `data/metrics.json`
2. Edit the values you want to change
3. Save the file
4. Refresh the website to see changes

**That's it! No coding knowledge needed.**

---

## What You Can Change:

### In each metric block, you can edit:
- **"value"**: The big number (like "847%" or "4.1x")
- **"title"**: The main heading (like "Portfolio Growth")  
- **"subtitle"**: The description (like "Current client, 5-year engagement")

### Example of what to edit:
```json
{
  "value": "847%",           ← Change this number
  "title": "Portfolio Growth",  ← Change this title
  "subtitle": "Current client, 5-year engagement"  ← Change this description
}
```

---

## Adding New Metrics:

To add a new metric, copy this template and add it to the "metrics" array:

```json
{
  "id": "new-metric-name",
  "value": "YOUR_NUMBER",
  "title": "YOUR TITLE",
  "subtitle": "Your description here",
  "icon": "TrendingUp",
  "color": "primary", 
  "animationDuration": 2000
}
```

### Available Icons:
- `TrendingUp` - Growth/trending arrow
- `Building2` - Buildings/corporate
- `Award` - Achievement/excellence
- `DollarSign` - Money/financial

### Available Colors:
- `primary` - Electric Blue
- `secondary` - Neon Green  
- `accent` - Pale Sky

---

## Real Examples:

### Current Client Success:
```json
{
  "value": "847%",
  "title": "Portfolio Growth", 
  "subtitle": "Current Fortune 500 client, 5-year partnership"
}
```

### Past Client Exit:
```json
{
  "value": "4.1x",
  "title": "Valuation Multiplier",
  "subtitle": "$410M → $1.7B successful acquisition"  
}
```

### Years of Experience:
```json
{
  "value": "15+", 
  "title": "Years of Excellence",
  "subtitle": "Transforming enterprises since 2010"
}
```

---

## Tips for Great Metrics:

### Do:
✅ Use specific numbers (847% vs "significant growth")
✅ Include timeframes ("5-year engagement")
✅ Add context ($410M → $1.7B)
✅ Keep subtitles under 50 characters for best display

### Don't:
❌ Use vague terms ("lots of growth")
❌ Make subtitles too long
❌ Change the "id" field (breaks animations)
❌ Delete the commas or brackets

---

## File Safety:

### Before Making Changes:
1. **Make a backup** - Copy the original file somewhere safe
2. **Test one change first** - Make a small edit and check it works
3. **Use a text editor** - Notepad++ or VS Code work great

### If Something Breaks:
1. Check for missing commas or brackets
2. Restore from your backup
3. The website will show fallback data if the file has errors

---

## File Location:
📁 `data/metrics.json`

## Need Help?
Contact the web development team if you run into any issues.

---

*Last updated: 2025-09-02*
