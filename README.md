# Shopify Starter Theme

<p align="center">
  <a href="https://www.nativo.team/">
    <img alt="Nativo Logo" src="https://www.nativo.team/wp-content/uploads/2021/02/Nativo_Logo.webp" height="40">
  </a>
</p>

<p align="center">
  <strong>A modern, responsive Shopify starter theme for Nativo projects</strong>
</p>

## 📋 Table of Contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Asset Management](#asset-management)
- [JavaScript Architecture](#javascript-architecture)
- [CSS Architecture](#css-architecture)
- [Shopify Theme Development with GitHub](#shopify-theme-development-with-github)
- [SEO Optimization](#seo-optimization)
- [Performance Recommendations](#performance-recommendations)
- [Useful Resources](#useful-resources)

## 🚀 Requirements

Before getting started, ensure you have the following installed:

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli/) - For theme development and deployment
- [Node.js](https://nodejs.org/) >= 16 - For package management and build tools

## ⚡ Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development mode:**
   ```bash
   npx mix watch
   ```
   
   This will watch for changes in your source files and automatically compile them.

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
shopify-starter-theme/
├── assets/                       # → Compiled theme assets
├── config/                       # → Theme configuration files
├── layout/                       # → Theme layout templates
├── locales/                      # → Internationalization files
├── sections/                     # → Reusable theme sections
├── snippets/                     # → Reusable theme snippets
├── templates/                    # → Page templates
├── src/                          # → Source files (before compilation)
│   ├── js/                       # → JavaScript source files
│   │   ├── filters/              # → Custom filters
│   │   ├── shared/               # → Shared utilities
│   │   ├── snippets/             # → Component-specific JS
│   │   └── frontend.js           # → Main frontend entry point
│   └── scss/                     # → SCSS source files
│       ├── sections/             # → Section-specific styles
│       ├── snippets/             # → Component-specific styles
│       ├── media-queries.scss    # → Responsive breakpoints
│       └── frontend.scss         # → Main stylesheet
├── package.json                  # → Node.js dependencies and scripts
└── webpack.mix.js               # → Laravel Mix configuration
```

## 🔄 Development Workflow

### 1. File Organization
Each page should have its own script and style files for maintainability:

```
src/
├── js/
│   ├── pages/
│   │   ├── home.js              # → Home page JavaScript
│   │   └── shop.js              # → Shop page JavaScript
│   └── components/
│       └── product-card.js      # → Reusable components
└── scss/
    ├── pages/
    │   ├── home.scss            # → Home page styles
    │   └── shop.scss            # → Shop page styles
    └── components/
        └── product-card.scss    # → Component styles
```

### 2. Development Process
1. Make changes to source files in the `src/` directory
2. Laravel Mix automatically compiles and watches for changes
3. Compiled files are output to the `assets/` directory
4. Test changes in your Shopify development store

## 🎨 Asset Management

This theme uses **Laravel Mix** for asset compilation, which provides:

- **SCSS compilation** with autoprefixer
- **JavaScript bundling** and minification
- **Asset versioning** for cache busting
- **Hot reloading** during development
- **Source maps** for debugging

### Important Notes:
- **Never edit files directly in the `assets/` folder** - they are auto-generated
- **Always work in the `src/` directory** - your source files
- **Run `npx mix watch`** during development for automatic compilation
- **Run `npm run build`** before deploying to production

## ⚙️ JavaScript Architecture

### Page-Specific JavaScript
Each page should use a class-based approach to prevent code execution on other pages:

```javascript
// home.js
import $ from "jquery";

class HomePage {
    constructor() {
        this.$page = $('[data-page="home"]');
        
        if (this.$page.length) {
            this.init();
        }
    }

    init() {
        console.log('Home page initialized');
        this.bindEvents();
    }

    bindEvents() {
        // Event handlers here
    }
}

// Initialize only if we're on the home page
new HomePage();
```

### Component JavaScript
```javascript
// product-card.js
class ProductCard {
    constructor(selector) {
        this.$element = $(selector);
        
        if (this.$element.length) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.$element.on('click', '.add-to-cart', this.handleAddToCart.bind(this));
    }

    handleAddToCart(e) {
        // Add to cart logic
    }
}

// Initialize product cards
$('.product-card').each(function() {
    new ProductCard(this);
});
```

## 🎨 CSS Architecture

### SCSS Structure
- Use **BEM methodology** for class naming
- Organize styles by component and page
- Leverage SCSS features like variables, mixins, and nesting
- Keep styles modular and reusable
- Use the built-in responsive mixins for consistent breakpoints

### Media Query Mixins
The theme includes a comprehensive set of responsive mixins for consistent breakpoint usage:

```scss
// Available breakpoints
$breakpoints: (
  xs: 576px,    // Extra small devices
  sm: 768px,    // Small devices (tablets)
  md: 992px,    // Medium devices (desktops)
  lg: 1200px    // Large devices (wide desktops)
);

// Usage examples:
.hero-section {
  padding: 1rem;
  
  // Apply styles for small devices and up
  @include respond-above(sm) {
    padding: 2rem;
  }
  
  // Apply styles for medium devices and down
  @include respond-below(md) {
    padding: 1.5rem;
  }
  
  // Apply styles between specific breakpoints
  @include respond-between(sm, lg) {
    padding: 2.5rem;
  }
}
```

### Example SCSS Structure:
```scss
// _variables.scss
$primary-color: #007bff;

// home.scss
.home-page {
    &__hero {
        background: $primary-color;
        padding: 1rem;
        
        // Responsive adjustments
        @include respond-above(sm) {
            padding: 2rem;
        }
        
        @include respond-above(md) {
            padding: 3rem;
        }
    }
}
```

## 🚀 Shopify Theme Development with GitHub

### Branch Strategy
Use a two-branch workflow for organized development:

1. **`main` branch** - Production-ready code
   - Only stable, tested changes
   - Deploy directly to your Shopify store
   - Tag releases for version tracking

2. **`develop` branch** - Development and testing
   - New features and bug fixes
   - Collaborate without affecting production
   - Merge to main via pull requests

### Feature Development Workflow
1. **Create an issue** with requirements and Monday.com URL
2. **Create a feature branch** from `develop` (e.g., `feature/issue-123-new-header`)
3. **Develop and test** your feature
4. **Create a pull request** to merge into `develop`
5. **Code review** and testing
6. **Merge to main** when ready for production

### Best Practices
- **Use Shopify CLI** for development and testing
- **Commit frequently** with descriptive messages
- **Link commits to issues** using `#issue-number`
- **Test thoroughly** before merging to main
- **Use semantic versioning** for releases

## 🔍 SEO Optimization

### Meta Tags
- Unique, descriptive page titles (50-60 characters)
- Compelling meta descriptions (150-160 characters)
- Proper Open Graph tags for social sharing

### Image Optimization
- Compress images using tools like [Photopea](https://photopea.com/)
- Use descriptive alt attributes
- Implement lazy loading for better performance

### Structured Data
- Implement JSON-LD markup for rich results
- Use [JSON-LD Generator](https://jsonld.com/) for testing
- Include product, organization, and breadcrumb schemas

### Performance
- Optimize Core Web Vitals
- Implement lazy loading
- Use responsive images
- Minimize render-blocking resources

## ⚡ Performance Recommendations

### JavaScript Libraries
- **Sliders**: Use [Swiper.js](https://swiperjs.com/) instead of Slick
- **Modals**: [Fancybox](https://fancyapps.com/) for image galleries
- **Notifications**: [Noty.js](https://ned.im/noty/) for toast messages
- **Accordions**: [Accordion.js](https://accordion.js.org/) for collapsible content

### Development Tools
- **Google Lighthouse** for performance auditing
- **GTmetrix** for detailed performance analysis
- **Shopify CLI** for local development and testing

## 📚 Useful Resources

### Shopify Development
- [Shopify Dev Tips: Lazy Loading](https://www.youtube.com/watch?v=dd3kpLt9KZY)
- [Shopify Theme Development](https://shopify.dev/docs/themes)
- [Shopify CLI Documentation](https://shopify.dev/docs/api/shopify-cli/)

### Version Control & Collaboration
- [GitHub Best Practices](https://docs.github.com/en/get-started/quickstart)
- [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)

### Performance & SEO
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [JSON-LD Generator](https://jsonld.com/)

### Design & Development
- [BEM Methodology](https://en.bem.info/)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [Laravel Mix Documentation](https://laravel-mix.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Nativo Team. All rights reserved.

---

**Need help?** Contact the Nativo development team or create an issue in this repository.
