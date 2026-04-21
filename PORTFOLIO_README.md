# Pankaj Thakur - Portfolio Website

An amazing, animated portfolio website built with Next.js, Framer Motion (Motion React), and Tailwind CSS featuring smooth scroll-based animations.

## 🎨 Features

- **Stunning Animations**: Smooth scroll-based animations using Framer Motion
  - Staggered fade-in/slide-up effects on scroll
  - Interactive hover effects with scale and shadow transitions
  - Animated progress bars for skills section
  - Smooth scroll behavior throughout the site

- **Modern Dark Theme**: Professional dark mode design with cyan accents
  - Dark slate background (#0f172a / #1e293b)
  - Bright cyan/blue gradients for CTAs and highlights
  - Smooth transitions and professional shadows

- **Fully Responsive**: Mobile-first responsive design
  - Works seamlessly on all device sizes
  - Touch-friendly interactions
  - Responsive grid layouts

- **Complete Sections**:
  - 🎯 **Hero**: Eye-catching introduction with animated title
  - 💼 **Experience**: Timeline with staggered animations
  - 🚀 **Projects**: Featured projects grid with cards
  - 🛠️ **Skills**: Animated skill bars and categories
  - 📧 **Contact**: Contact info with social links
  - 📱 **Navigation**: Sticky nav with smooth scroll links

## 📁 Project Structure

```
/components
  ├── navigation.tsx    # Sticky navigation with smooth scroll
  ├── hero.tsx          # Hero section with animated title
  ├── experience.tsx    # Timeline with work experiences
  ├── projects.tsx      # Project cards grid
  ├── skills.tsx        # Skills with animated progress bars
  ├── contact.tsx       # Contact section with links
  └── footer.tsx        # Footer with social links

/lib
  ├── portfolio-data.ts # All portfolio data (easy to update)
  ├── animations.ts     # Reusable Framer Motion variants
  └── utils.ts          # Utility functions

/app
  ├── page.tsx          # Main page component
  ├── layout.tsx        # Root layout with metadata
  └── globals.css       # Global styles and theme
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The site will be available at `http://localhost:3000`

## 🎬 Animation Details

### Scroll-Based Animations
- **useInView Hook**: Detects when sections come into view
- **Fade In + Slide Up**: Elements fade and slide up on scroll
- **Staggered Children**: Multiple elements animate in sequence with delays

### Interactive Animations
- **Hover Effects**: Cards and buttons scale up with shadow effects
- **Button Interactions**: Scale up on hover, scale down on click
- **Smooth Transitions**: All animations use easing functions for natural movement

### Key Animation Variants
- `fadeInUp`: Fade + slide up combined
- `slideInLeft/Right`: Slide from sides with stagger
- `scaleIn`: Scale from center
- `containerVariants`: Parent container for staggering children
- `textVariants`: Word-by-word text animations

## 📝 Customization

### Update Portfolio Data
Edit `/lib/portfolio-data.ts` to update:
- Personal info (name, email, phone, location)
- Social links
- Experience history
- Projects list
- Skills and proficiency levels
- Education

### Customize Colors
The site uses a dark theme with cyan accents. To change:
1. Modify Tailwind classes (e.g., `cyan-400` → `blue-400`)
2. Update gradients in components
3. Adjust shadow colors: `shadow-cyan-400/50`

### Adjust Animation Speed
In `/lib/animations.ts`, modify:
- `duration`: Animation speed in seconds
- `delay`: Time before animation starts
- `ease`: Animation easing function

## 🛠️ Technologies Used

- **Framework**: Next.js 16.2.0
- **Animation**: Framer Motion (Motion React) 12.38.0
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

## 📊 Performance

- ✅ Fast load times with optimized images
- ✅ Smooth 60fps animations
- ✅ Lazy loading for off-screen content
- ✅ Code-split animations
- ✅ Optimized for mobile devices

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect your GitHub repo and push
git push origin main

# Vercel will auto-detect Next.js and deploy
```

Visit [Vercel](https://vercel.com) to deploy your portfolio in seconds.

### Other Platforms

Works with any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📱 SEO & Meta Tags

The portfolio includes:
- ✅ Optimized title and description
- ✅ Open Graph tags for social sharing
- ✅ Twitter card metadata
- ✅ Structured semantic HTML
- ✅ Alt text for images

## 🔧 Maintenance

### Adding New Projects
1. Edit `portfolioData.projects` in `/lib/portfolio-data.ts`
2. Add project object with title, description, technologies, links
3. Set `featured: true` for featured projects

### Adding New Skills
1. Edit `portfolioData.skills` in `/lib/portfolio-data.ts`
2. Add skill with name and proficiency percentage
3. Animated progress bars will update automatically

### Updating Experience
1. Edit `portfolioData.experience` in `/lib/portfolio-data.ts`
2. Timeline will automatically reorganize entries

## 🐛 Troubleshooting

### Animations not working?
- Check browser DevTools for console errors
- Ensure Framer Motion is installed: `pnpm list framer-motion`
- Restart dev server: `pnpm dev`

### Styling issues?
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `pnpm build && pnpm dev`

### Scroll animations not triggering?
- Check `useInView` margin prop in components
- Ensure section has sufficient height
- Verify scroll behavior in DevTools

## 📄 License

Feel free to use this portfolio template as a starting point for your own!

## 🎉 Enjoy!

Your portfolio is ready to impress! Share it with employers, clients, and fellow developers.

Happy coding! 🚀
