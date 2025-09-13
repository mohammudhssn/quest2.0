# Quest 2.0 - Interactive Wedding Quest Platform

Transform your wedding celebrations into engaging adventures with custom challenges, real-time interaction, and unforgettable memories.

## 🎯 Live Demo
- **Landing Page**: Professional showcase of Quest platform
- **Interactive Demo**: Try the wedding quest experience
- **Mobile Responsive**: Works perfectly on all devices

## ✨ Features

### 🎨 Professional Landing Page
- Beautiful gradient design with coral/purple/yellow theme
- Interactive feature showcase
- Social proof and testimonials
- Clear call-to-action flow

### 🎮 Interactive Quest Game
- **Parents' Wisdom**: Discover ancient proverbs from both families
- **Multiple Choice Challenges**: Test knowledge about the couple
- **Text Input Puzzles**: Reflective questions with hint system
- **Progress Tracking**: Real-time scoring and completion status
- **Mobile-First Design**: Optimized for smartphones and tablets

### 🎨 Design System
- **Colors**: Coral (`#FF6B6B`), Purple (`#6B73FF`), Yellow (`#FFB366`)
- **Typography**: Inter font family
- **Components**: Professional cards with shadows and animations
- **Responsive**: Mobile-first approach with beautiful transitions

## 🚀 Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom shadcn/ui inspired components
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready

## 🏗️ Project Structure
```
src/
├── app/
│   ├── page.tsx          # Redirects to landing
│   ├── landing/page.tsx  # Professional landing page
│   ├── play/page.tsx     # Quest game interface
│   ├── layout.tsx        # Root layout with Inter font
│   └── globals.css       # Quest design system
├── components/
│   ├── clues/
│   │   ├── ParentsClue.tsx   # Main quest component
│   │   └── PersonXClue.tsx   # Mystery guest clue
│   └── ui/               # Reusable UI components
└── lib/
    └── utils.ts          # Utility functions
```

## 🎯 User Journey
1. **Landing Page** (`/`) → Professional platform presentation
2. **Try Demo Quest** → Seamless transition to game (`/play`)
3. **Onboarding** → Beautiful form with Quest branding
4. **Quest Selection** → Choose between available challenges
5. **Interactive Game** → Engaging quest with professional UI
6. **Completion** → Success celebration with return options

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/mohammudhssn/quest2.0.git
cd quest2.0

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js
3. Deploy with zero configuration
4. Automatic deployments on every push

### Environment Variables
No environment variables required for basic functionality.

## 🎮 Quest Components

### Parents' Wisdom Clue
- **Multiple Choice Questions**: Test knowledge about both families
- **Ancient Proverbs**: Discover meaningful sayings from groom's and bride's parents
- **Reflection Questions**: Text input with intelligent hint system
- **Progress Tracking**: Visual progress bar and scoring
- **Responsive Design**: Beautiful on all screen sizes

### Features
- ✅ Dynamic question shuffling
- ✅ Hint system with point deduction
- ✅ Smooth animations and transitions
- ✅ Professional card-based UI
- ✅ Success celebrations
- ✅ Navigation between clues

## 🎨 Design Tokens
```css
/* Quest Color Palette */
--coral: 0 61% 69%;        /* #FF6B6B */
--soft-purple: 251 100% 69%; /* #6B73FF */
--warm-yellow: 35 100% 66%;  /* #FFB366 */

/* Gradients */
.quest-gradient: coral → purple → yellow
.quest-card: Professional shadows and rounded corners
```

## 📱 Responsive Design
- **Mobile First**: Optimized for touch interactions
- **Tablet Friendly**: Beautiful on iPad and similar devices  
- **Desktop Enhanced**: Rich experience on larger screens
- **Touch Optimized**: Large tap targets and smooth gestures

## 🔧 Customization

### Adding New Clues
1. Create component in `src/components/clues/`
2. Add to quest selection in `src/app/play/page.tsx`
3. Follow existing patterns for scoring and navigation

### Styling
- Modify `src/app/globals.css` for design system changes
- Update `tailwind.config.js` for new colors/utilities
- Components use consistent `.quest-*` classes

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License
This project is licensed under the MIT License.

## 🎊 Credits
Built with love for creating magical wedding experiences that bring people together through interactive storytelling and meaningful challenges.

---

**Quest 2.0** - Transform your events into interactive adventures! 🚀