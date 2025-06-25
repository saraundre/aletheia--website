# Aletheia Website

A modern, mobile-first Next.js website for Aletheia Collective - building research technologies that solve real-world problems. Truth in tech, action in society.

## 🚀 Features

- **Mobile-First Design**: Responsive design that works perfectly on all devices
- **Smooth Animations**: Interactive scroll animations using Framer Motion
- **SEO Optimized**: Built with Next.js 14 and comprehensive metadata
- **Modern UI**: Beautiful design with Tailwind CSS and custom components
- **Form Validation**: Contact form with React Hook Form and Zod validation
- **Performance Optimized**: Fast loading with Next.js optimizations

## 📱 Pages

### Home Page (`/`)
- Hero section with founding quote
- "We Are" section with role cards
- "What We Do" section with business approach
- Collaborators carousel with scrolling animation
- Signature section with call-to-action

### STEM For All (`/stem-for-all`)
- Hero section about equitable learning
- Video content section
- Core values with interactive cards
- Inspirational quote section
- Call to action for joining the movement

### Contact (`/contact`)
- Hero section with "Let's Talk" message
- Contact form with validation
- Direct contact information
- Response time expectations

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aletheia-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Dependency Optimization

This project uses **properly categorized dependencies** for efficient builds:

### Production Dependencies
- Core Next.js, React, and UI libraries
- Build tools required for production builds (Tailwind CSS, PostCSS, Autoprefixer)
- Essential for the application to function

### Development Dependencies
- Testing and development tools only
- TypeScript, ESLint, Jest, and development utilities

### Why This Matters
- **Correct categorization**: Build dependencies are available during production builds
- **Memory efficient**: No unnecessary heavy browser automation tools
- **Cost effective**: Optimized dependency tree for deployment platforms

### SEO Implementation
SEO is handled entirely through **Next.js built-in features**:
- ✅ **Metadata API** for comprehensive meta tags
- ✅ **Open Graph** for social media sharing
- ✅ **Structured data** for search engines
- ✅ **Performance optimization** via Next.js optimizations
- ✅ **No external SEO tools required**

## 🏗️ Project Structure

```
aletheia-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── stem-for-all/      # STEM For All page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── sections/         # Page sections
│       ├── HeroSection.tsx
│       ├── WeAreSection.tsx
│       ├── WhatWeDoSection.tsx
│       ├── CollaboratorsCarousel.tsx
│       ├── SignatureSection.tsx
│       ├── StemHeroSection.tsx
│       ├── VideoContentSection.tsx
│       ├── CoreValuesSection.tsx
│       ├── InspirationalQuoteSection.tsx
│       ├── StemCallToActionSection.tsx
│       ├── ContactHeroSection.tsx
│       ├── ContactFormSection.tsx
│       └── ContactInfoSection.tsx
├── lib/                  # Utility functions
├── public/              # Static assets
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Accent**: Purple gradient (`#d946ef` to `#c026d3`)
- **Dark**: Gray scale (`#0f172a` to `#f8fafc`)

### Typography
- **Headings**: Inter (Bold, 700-900)
- **Body**: Inter (Regular, 400-500)
- **Monospace**: JetBrains Mono

### Components
- **Buttons**: Primary and secondary variants with hover effects
- **Cards**: Rounded corners with shadows and hover animations
- **Forms**: Clean inputs with validation states
- **Navigation**: Fixed header with mobile menu

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Render.com Deployment

The project is configured for automatic deployment on Render.com with the following settings:

- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment**: Node.js
- **Port**: 3000 (automatically set by Render)

#### Optimized Build Process
- **Memory efficient**: No heavy browser automation tools
- **Faster deployment**: Only essential dependencies are installed
- **Reliable builds**: Streamlined dependency tree prevents build failures

#### Environment Variables

The following environment variables are automatically configured:
- `NODE_ENV=production`
- `PORT=3000`

### Other Platforms
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://aletheia.sg
```

### Customization
- **Colors**: Modify `tailwind.config.js`
- **Fonts**: Update `app/globals.css`
- **Animations**: Adjust Framer Motion variants in components

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Optimized with Next.js tree shaking
- **Images**: Optimized with Next.js Image component

## 🔍 SEO Features

- **Meta Tags**: Comprehensive metadata for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for better search results
- **Sitemap**: Auto-generated sitemap
- **Robots.txt**: Search engine crawling optimization

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Aletheia Collective** for the vision and content
- **Next.js** team for the amazing framework
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first approach

---

**Built with ❤️ by the Aletheia team**

*Truth in tech, action in society.*

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🛠️ Troubleshooting

### Build Issues

If you encounter build failures:

1. **Status 137 (Out of Memory)**: This has been resolved by removing unnecessary heavy dependencies
   - No more `lighthouse` or `puppeteer` packages
   - Streamlined dependency tree
   - Check that `.npmrc` file exists with `production=true`

2. **Clear cache**: Delete `.next` folder and `node_modules`
3. **Reinstall dependencies**: `npm install`
4. **Check Node version**: Ensure you're using Node.js 18+ or 22+

### Runtime Issues

If the site shows "not found" errors:

1. **Check logs**: View Render.com deployment logs
2. **Verify routes**: Ensure all page files exist in `app/` directory
3. **Check imports**: Verify all component imports are correct

### Common Issues

- **Logger module errors**: The logger is optional and has fallbacks
- **Missing assets**: Favicon and manifest files are handled gracefully
- **CSS layer errors**: All Tailwind directives are properly configured

## 📁 Project Structure

```
aletheia--website/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── contact/           # Contact page
│   └── stem-for-all/      # STEM page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/              # UI components
├── lib/                  # Utility libraries
├── public/              # Static assets
├── scripts/             # Build scripts
└── tests/               # Test files
```

## 🎨 Design System

The project uses a consistent design system with:

- **Typography**: Playfair Display for headings, system fonts for body
- **Colors**: Neutral palette with red accents
- **Spacing**: Consistent 8px grid system
- **Animations**: Framer Motion for smooth interactions

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Adding New Pages

1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Import and use components from `components/sections/`

### Adding New Components

1. Create component in appropriate directory under `components/`
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Add proper JSDoc comments

## 📝 License

This project is private and proprietary to Aletheia Collective. 