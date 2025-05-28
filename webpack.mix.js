const mix = require('laravel-mix');
const minifier = require('minifier');

mix.setPublicPath('assets');
mix.options({
   fileLoaderDirs:  {
       fonts: './'
   }
});
mix.js('src/js/frontend.js', 'assets')
   .vue({
      version: 3,
   });

mix.sass('src/scss/frontend.scss', '')
mix.sass('src/scss/frontend-vendor.scss', '');
   
mix.then(() => {
   minifier.minify('assets/frontend.css'); 
   minifier.minify('assets/frontend-vendor.css'); 
});