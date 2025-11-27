# 🎓 Smart Attendance Portal

A modern, feature-rich attendance tracking portal built with React, TypeScript, and Tailwind CSS. Features **dual theme support** - choose between a futuristic cyberpunk theme with Matrix-style animations or a clean minimalist design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-FF0055)

## ✨ Features

### 🎨 Dual Theme System
**Choose your style! Switch between two beautiful themes:**

#### 🤖 Cyberpunk Theme
- Matrix-style code rain with falling binary and keywords
- Animated cyan grid that scrolls infinitely
- Glowing neon orbs (cyan, green, pink)
- Terminal-style text snippets
- Glitch effects and CRT scanlines
- Pulsing circuit lines with SVG animations
- Robotic blue UI components
- Perfect for tech enthusiasts and hackathon vibes

#### 📱 Minimalist Theme
- Clean light gradient backgrounds
- Subtle floating geometric shapes
- Gentle dot patterns
- Professional shadows and borders
- Smooth color transitions
- Modern flat design
- Perfect for users who prefer simplicity

**Theme Features:**
- 🔄 One-click theme toggle button (bottom-right)
- 💾 Automatic localStorage persistence
- ⚡ Smooth animated transitions
- 🎯 Consistent design language across both themes

### 📊 Attendance Features
- **Real-time Sync** - Live attendance data from CyberVidya API
- **Course-wise Breakdown** - Detailed attendance per course component
- **Daywise Reports** - Complete lecture-by-lecture history with robotic UI
- **Smart Calculations** - Auto-calculate classes you can miss or need to attend
- **Overall Statistics** - Beautiful donut chart visualization of total attendance
- **Performance Metrics** - CGPA display with progress bars
- **Upcoming Classes** - See your next scheduled lectures
- **Status Indicators** - Present (green), Absent (red), Adjusted (amber)

### 🔐 Security & UX
- **Secure Authentication** - Token-based login with CyberVidya credentials
- **Remember Me** - Optional credential persistence with cookies
- **Session Management** - Automatic logout and re-authentication
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Error Handling** - User-friendly error messages and loading states
- **Loading Animations** - Smooth spinners and skeleton screens

### 🎯 Advanced UI Components
- **Robotic Daywise Report** - CPU icons, tech-style frames, scan line effects
- **Animated Cards** - Hover effects, scale transforms, glow effects
- **Donut Charts** - Circular progress with animated fills
- **Status Badges** - Corner brackets, color-coded indicators
- **Live Data Indicators** - Pulsing dots, real-time updates
- **Modal Dialogs** - Smooth backdrop blur with close animations

## 🚀 Tech Stack

### Core
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool with HMR
- **Tailwind CSS** - Utility-first CSS framework

### Libraries & Tools
- **Framer Motion** - Advanced animations and transitions
- **Axios** - HTTP client for API requests
- **js-cookie** - Cookie management for authentication
- **Lucide React** - Beautiful, consistent icon library

### Design System
- **Glassmorphism** - Backdrop blur and transparency effects
- **Gradient Overlays** - Dynamic color transitions
- **Responsive Grid** - Mobile-first design approach
- **Custom Animations** - Matrix rain, glowing effects, scanlines

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm
- CyberVidya university credentials

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/attendance-kiet.git
cd attendance-kiet

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🏗️ Project Structure

```
attendance-kiet/
├── src/
│   ├── components/
│   │   ├── Attendance.tsx              # Main attendance dashboard
│   │   ├── BackgroundAnimation.tsx     # Cyberpunk-themed background
│   │   ├── MinimalistBackground.tsx    # Minimalist-themed background
│   │   ├── LoginForm.tsx               # Authentication form
│   │   ├── Daywise.tsx                 # Robotic lecture history UI
│   │   ├── OverallAtt.tsx              # Overall attendance donut chart
│   │   ├── PerformanceCard.tsx         # CGPA and performance metrics
│   │   ├── UpcomingClassesCard.tsx     # Next scheduled classes
│   │   ├── ThemeToggle.tsx             # Theme switcher button
│   │   └── Footer.tsx                  # App footer
│   ├── contexts/
│   │   └── ThemeContext.tsx            # Theme management context
│   ├── types/
│   │   ├── response.ts                 # API response types
│   │   ├── CookieVars.ts               # Cookie constants
│   │   └── utils.ts                    # Utility functions
│   ├── App.tsx                         # Main app component
│   ├── main.tsx                        # App entry point
│   └── index.css                       # Global styles
├── public/                             # Static assets
├── index.html                          # HTML template
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript config
├── tailwind.config.js                  # Tailwind configuration
└── vite.config.ts                      # Vite configuration
```

## 🎨 Theme System

### How It Works

The dual theme system uses React Context to manage theme state globally:

```typescript
import { useTheme } from "./contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === "minimalist" ? "light-styles" : "dark-styles"}>
      <button onClick={toggleTheme}>Switch Theme</button>
    </div>
  );
}
```

### Theme Persistence

Themes are automatically saved to `localStorage` and restored on page reload:

```typescript
localStorage.setItem("attendance-theme", theme); // Auto-saved
```

### Switching Themes

Click the floating button in the bottom-right corner to instantly switch between:
- 🤖 **Cyberpunk** (Matrix rain, neon, tech)
- 📱 **Minimalist** (Clean, light, professional)

## 🎯 Design Tokens

### Cyberpunk Theme Colors
- **Primary**: Cyan (#00FFFF) - Main accents
- **Secondary**: Green (#00FF00) - Success states
- **Tertiary**: Blue (#3B82F6) - Robotic elements
- **Background**: Dark (#0A0A0A, #1A1A2E)
- **Text**: White/Cyan for high contrast

### Minimalist Theme Colors
- **Primary**: Blue (#3B82F6) - Main accents
- **Secondary**: Purple (#8B5CF6) - Highlights
- **Background**: Light (#F8FAFC, #FFFFFF)
- **Text**: Slate (#0F172A, #64748B)
- **Borders**: Subtle gray (#E2E8F0)

### Typography
- **Headers**: Bold, uppercase, tracking-wide (Cyberpunk) / Semibold (Minimalist)
- **Body**: Inter/System fonts for readability
- **Monospace**: Courier for terminal/code aesthetics

### Animations
- **Loading**: CPU spinner with rotating rings (Cyberpunk) / Simple spinner (Minimalist)
- **Hover**: Glow effects with box-shadow (Cyberpunk) / Subtle lift (Minimalist)
- **Transitions**: 300ms ease-out for smooth interactions
- **Page Load**: Fade in with slide up (both themes)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://kiet.cybervidya.net/api
```

### Cookie Configuration

Adjust cookie settings in `src/types/CookieVars.ts`:

```typescript
export const AUTH_COOKIE_NAME = "auth_token";
export const USERNAME_COOKIE = "username";
export const PASSWORD_COOKIE = "password";
export const REMEMBER_ME_COOKIE = "remember_me";
export const COOKIE_EXPIRY = 30; // days
```

### Theme Configuration

Default theme can be set in `src/contexts/ThemeContext.tsx`:

```typescript
const [theme, setTheme] = useState<Theme>(() => {
  const saved = localStorage.getItem("attendance-theme");
  return (saved as Theme) || "cyberpunk"; // Change default here
});
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🎯 Key Features Explained

### Cyberpunk Background Animation

The cyberpunk background includes:
- **Matrix Rain**: 100+ columns of falling code with binary and keywords
- **Animated Grid**: Cyan lines scrolling diagonally at 0.5px/frame
- **Floating Brackets**: Large `{ }` and `< />` symbols with pulse animation
- **Glowing Orbs**: 3 large orbs (cyan, green, pink) with radial gradients
- **Terminal Text**: "npm run build", "listening on port 3000"
- **Glitch Effect**: Random horizontal shift every 3 seconds
- **Scanlines**: Repeating 4px pattern for CRT monitor effect
- **Circuit Lines**: Animated SVG paths with pulsing nodes

### Minimalist Background

The minimalist background features:
- **Gradient Base**: Soft slate gradient (f8fafc → e2e8f0)
- **Floating Circles**: 2 large blurred circles with gentle movement
- **Geometric Shapes**: 2 rotating organic shapes with smooth borders
- **Dot Pattern**: Subtle 50px grid of tiny dots
- **Light Rays**: Rotating conic gradient for depth
- **Vignette**: Soft edge darkening for focus

### Attendance Calculation

```typescript
// Can miss calculation (when >= 75%)
canMiss = floor((present - 0.75 * total) / 0.75)

// Need to attend calculation (when < 75%)
needAttend = ceil((0.75 * total - present) / (1 - 0.75))
```

### Robotic Daywise Report

Features a cyberpunk-inspired interface:
- **CPU Icon Spinner**: 3-layer rotating loading animation
- **Tech-Style Header**: Glowing CPU chip icon with pulsing effect
- **Framed Date Boxes**: Blue-bordered containers with glow
- **Scan Line Effect**: Animated horizontal sweep on hover
- **Status Badges**: Corner brackets for robotic aesthetic
- **Stats Panel**: Color-coded P/A/Adj counts with indicators
- **Live Indicator**: Pulsing blue dot with "LIVE" text

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- ✅ Use TypeScript for all new files
- ✅ Follow existing component patterns
- ✅ Use Tailwind classes instead of custom CSS when possible
- ✅ Add theme-aware styling for new components
- ✅ Include comments for complex logic
- ✅ Ensure responsive design (mobile, tablet, desktop)
- ✅ Test both themes before submitting PR

### Component Structure

```typescript
import { useTheme } from "../contexts/ThemeContext";

export default function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div className={`
      base-classes
      ${theme === "minimalist" 
        ? "light-theme-classes" 
        : "dark-theme-classes"
      }
    `}>
      {/* Component content */}
    </div>
  );
}
```

## 👥 Credits

**Developed by:**
- Tushar Pant
- Abhishek Mishra
- Ankit Kumar Shahi
- Alok Kumar


**Special Thanks:**
- KIET Group of Institutions
- CyberVidya for API access
- Open-source community for amazing tools

## 📞 Support

For support:
- 📧 Email your university IT department
- 🐛 Open an issue on [GitHub](https://github.com/yourusername/attendance-kiet/issues)
- 💬 Start a discussion on GitHub Discussions

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

### Share With Friends
- 🎓 Perfect for KIET students
- 💻 Great portfolio project
- 🚀 Learn modern React patterns
- 🎨 Explore advanced animations

## 📸 Screenshots

### Cyberpunk Theme
- Dark, futuristic interface
- Matrix rain background
- Neon glowing effects
- Terminal aesthetics

### Minimalist Theme
- Clean, professional design
- Light backgrounds
- Subtle animations
- Modern flat UI

---

**Built with 💙 by students, for students.**  
**Choose your style. Track your attendance. Stay on top!** 🎯
