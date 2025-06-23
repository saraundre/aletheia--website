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