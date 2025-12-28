# Portfolio Structure for chaining.dev

## File Structure
```
/app
  layout.js          # Main layout with fonts, metadata
  page.js            # Homepage with hero + project cards
  globals.css        # Tailwind + custom styles
  
/components
  ProjectCard.js     # Expandable project card component
  ChatWidget.js      # Optional chat in bottom right
  Header.js          # Simple header with nav
  Footer.js          # Contact links
  
/data
  projects.js        # All project data (perfect for embeddings)
  ideas.js           # Future projects/ideas
  
/public
  /diagrams          # Architecture diagrams (SVG/PNG)
  /screenshots       # Project screenshots
```

## Data Structure (Perfect for Embeddings)

Each project structured as:
```js
{
  id: "trading-system",
  title: "Autonomous Trading System",
  tagline: "Multi-agent RL managing live capital",
  category: "Production System",
  status: "Live",
  tags: ["Python", "RL", "Cloudflare Workers", "Real-time"],
  
  // Quick overview (shown in card)
  overview: "Self-managing agent ecosystem...",
  
  // Detailed sections (shown when expanded)
  problem: "...",
  solution: "...",
  architecture: "...",
  techStack: [...],
  challenges: "...",
  results: {
    metric1: "...",
    metric2: "..."
  },
  manufacturingRelevance: "How this applies to ABT...",
  
  // Links
  github: "...",
  demo: "...",
  diagram: "/diagrams/trading-architecture.svg"
}
```

## Page Sections

1. **Hero** - Name, title, quick intro
2. **Projects** - Expandable cards (4 main projects)
3. **Ideas** - What I'm building next (3-4 items)
4. **Contact** - Links + optional chat widget

## Interaction Flow

**Collapsed Card:**
- Title + tagline
- Tech tags
- Status badge
- "Expand" arrow

**Expanded Card:**
- Everything from collapsed
- Problem statement
- Solution approach  
- Architecture diagram
- Tech stack details
- Key challenges solved
- Results/metrics
- Manufacturing relevance
- Links (GitHub, demo)
- "Collapse" arrow

## Mobile Considerations

- Cards stack vertically
- Expanded cards push others down
- Chat widget hides on mobile (or bottom bar)
- Touch-friendly expand/collapse

## Chat Integration (Optional)

- Small bubble bottom right: "Ask about my projects 💬"
- Expands to chat interface
- Loads all project data as context
- Uses Claude API (already have account)
- Can answer: "Tell me about the trading system"
- Can answer: "What's relevant for manufacturing?"
- Can answer: "What technologies do you use?"

## Color Scheme (Clean/Professional)

- Background: Black (#000) or very dark gray (#0a0a0a)
- Text: White (#fff) with gray (#a0a0a0) for secondary
- Accent: Blue (#3b82f6) for links/actions
- Cards: Dark gray (#171717) with hover effect
- Code/tags: Slightly lighter gray (#262626)

## Key Features

✅ Fast load (static generation)
✅ Skimmable (collapsed cards)
✅ Deep-dive available (expand for details)
✅ Mobile responsive
✅ SEO optimized (all content in HTML)
✅ Perfect for embeddings (structured data)
✅ Professional look
✅ Optional AI chat without being gimmicky
