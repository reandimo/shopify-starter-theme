

// Lazy loading
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import Vue from "vue";
window.Vue = Vue;

let axios = require('axios');
window.axios = axios;


let jQuery = require('jquery');
window.jQuery = window.$ = jQuery;

import 'popper.js';

import 'bootstrap';

window.Noty = require('noty'); 

// Vue Components

require('./snippets/ProductForm.js');
require('./snippets/CartForm.js');
require('./snippets/MiniCart.js');
require('./snippets/product-card.js');


// javascript
require('./product.js');
require('./header.js');