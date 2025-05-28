<p align="center">
  <a href="https://www.nativo.team/">
    <img alt="Logo" src="https://www.nativo.team/wp-content/uploads/2021/02/Nativo_Logo.webp" height="40">
  </a>
</p>
 
<p align="center">
  <strong>Shopify starter theme for Nativo projects</strong>
</p> 

## Requirements

Make sure all dependencies have been installed before moving on:

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli/)
- [Node.js](http://nodejs.org/) >= 16

## Setup

Run the following command on the root of the theme:
 
1. Run npm install command:
```sh 
npm install
```

2. Activate Webpack Watch to track changes on the scripts/styles files and compile.

```sh 
npx mix watch
```

## File Structure

Shopify starter theme comes with the following file structure:

```sh

shopify-theme-starter/			    # → Root of the theme
├── assets/							        # → Theme assets (compiled)
├── config/                    	# → Theme config
├── layout/                    	# → Theme layout
├── locales/                    # → Theme locales
├── sections/                   # → Theme sections
├── snipppets/                  # → Theme snippets
├── templates/                  # → Theme templates
├── src/                    		# → Theme source assets (before compilation)
│   ├── fonts                   # → Theme fonts
│   ├── styles                  # → Theme styles
│   ├── scripts                 # → Theme javascript 
├── node_modules/               # → Folder of the required Node.js packages (never edit)
├── package.json                # → Node.js dependencies and scripts
└── templates/                  # → Folder for all the templates and parts of the site
```

## How to work with assets

Is very important when developing a theme to do maintainable code, this is why packing all the code in just one file (without using a compiler like Gulp or Webpack) is not acceptable. The starter theme uses **Laravel Mix** to compile SASS and JS so it's important to remember compile after you edit any file related, this can be done easily if you track your changes running `npm run watch` on the root of the theme.

All the pages in the website must have their own script and style file, let’s see the following example:

We have 2 pages in our website: Home and Shop; so our file structure should looks like:

```bash
themes/your-theme-name/           # → Root of the theme

├── src/                          # → Theme assets
│   ├── fonts                     # → Theme fonts
│   ├── styles                    # → Theme styles [sass files]
│   │   ├── components
│   │   │    └── *components styles*
│   │   ├── pages
│   │   │    ├── home.scss        # → Home styles
│   │   │    └── shop.scss        # → Shop styles
│   │   └── general.scss          # → [Optional] Theme general styles
│   └── scripts                   # → Theme javascript
│       ├── components
│       │    └── *components javascript*
│       └── pages
│            ├── home.js          # → Home javascript
│            └── shop.js          # → Shop javascript
```

Following that structure, all the JS files should be declared as classes and initialized inside the file. Let’s see the `home.js`  and `shop.js` example.

```jsx
// ---
// Home
import $ from "jquery";

var HomePage = function(){

    // object
    var _ = this;

    // view
    _.$page = $('[data-page="home"]');

    // init
    _.init = function () {
        console.log('init home.js')
    }

    if (_.$page.length) {
        _.init();
    }

};

// Initialize the page with a custom JS selector
var pageHome = new HomePage();
```

```jsx
// ---
// Shop
import $ from "jquery";

var ShopPage = function (sel) {
	// object
	var _ = this;

	// view
	_.$page = $(sel);

	// init
	this.init = function () {

  }
	// ---

	// only initialize the file if the page is loaded
	if (_.$page.length) {
		this.init();
	}
};

// Initialize the page with a custom JS selector
let pageShop = new ShopPage('.page-template-shop');
```

The use of classes inside the JS is mandatory to prevent code execution on other pages in the site, all the JS and CSS files will be compiled with **Laravel Mix** to create 4 new files used by the theme:

```bash
themes/your-theme-name/             # → Root of the theme
└── assets/                         # → Theme assets
    ├── frontend.css                # → Compiled frontend related styles
    └── frontend.js                 # → Compiled frontend related javascript
```

The most important thing to keep in mind is to keep modules/pages separated and this process should be repeated for each page and compiled after edit.

# Shopify Theme Development Using GitHub

## Introduction

Developing Shopify themes can be a complex process, requiring careful version control, collaboration, and optimization. Leveraging GitHub for theme development simplifies workflow, ensures consistency, and helps manage iterations efficiently. This document outlines a streamlined approach to Shopify theme development using GitHub with a focus on organization, SEO optimization, and resources to enhance your process.

## Why Bother?

- **Version Control:** Track changes, revert to previous versions, and maintain a clear development history.
- **Collaboration:** Easily share progress with teammates and facilitate code reviews.
- **Organization:** Segregate production-ready code and in-progress changes for better workflow management.
- **Backup & Recovery:** Securely store your theme files in the cloud and avoid accidental loss.

## Use Two GitHub Branches: Main and Develop

1. **Main Branch**
    - The primary branch for production-ready code.
    - Only stable, thoroughly tested changes should be merged here.
    - Use this branch to deploy updates to your Shopify store.
2. **Develop Branch**
    - The working branch for new features, bug fixes, and experiments.
    - This branch allows developers to collaborate without affecting the live site.
    - Once changes in `develop` are stable, they can be merged into `main` via pull requests.
    - Use Shopify CLI to code, test, and commit. When you change something in Shopify the repo is updated, this is fine for small changes but if you’re coding a feature use Shopify CLI to code and commit when ready. This makes the repo easier to track.

## Create Issues and Branches for New Features

- When a new feature is requested, create a GitHub issue with the Monday URL attached to outline the requirements and track progress.
- Create a new branch for the feature (e.g., `feature/issue-123-new-header`) and link it to the issue.
- Once the feature is complete and tested, merge the branch into `develop` (or `main` if ready for launch) using a pull request.
- After the branch is merged, close the issue to signal completion.
- This ensures traceability and a structured development process.

## Use of NPM and Modern Compilers

- Leverage **NPM** to manage project dependencies, such as JavaScript libraries and CSS frameworks.
- Use modern compilers like **Laravel Mix** to streamline asset compilation and minification.
    - Write in modern JavaScript (ES6+) and SCSS, and let Laravel Mix handle transpiling for browser compatibility.
    - Automate tasks like concatenation, versioning, and hot-reloading to save time and reduce errors. 

## SEO Optimization Recommendations

1. **Optimize Meta Tags:** Ensure meta titles and descriptions are concise, unique, and relevant.
2. **Image Optimization:** Compress images and use descriptive alt attributes. You can do this for free with [Photopea](https://photopea.com/) App.
3. **Structured Data:** Implement JSON-LD for rich results and better search engine understanding.
4. **Lazy Loading:** Defer loading of offscreen images and video to improve page speed.
5. **Mobile Responsiveness:** Ensure your theme is fully responsive and performs well on all devices.
6. **404 Page Optimization:** Create custom, user-friendly 404 pages with helpful links.
7. **Regular Audits:** Use tools like Google Lighthouse or GTmetrix to monitor and improve performance.

## Misc. Recommendations

- Use new JS packages for sliders like Swiper instead of slick.
- Fancybox JS for Image galleries and popups.
- Noty.js for toastrs.
- accordion-js for accordions.

## Resource Links

- [**Shopify Dev Tips: Lazy Loading**](https://www.youtube.com/watch?v=dd3kpLt9KZY)
- [GitHub Best Practices](https://docs.github.com/en/get-started/quickstart)
- [JSON-LD Generator](https://jsonld.com/)