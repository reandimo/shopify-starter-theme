import { store } from "./../shared/cartData.js";

import { cloneDeep } from "lodash/cloneDeep";

import { createApp } from 'vue';

const MiniCart = createApp({
    // el:".mini-cart",
    delimiters: ['${', '}'],

    data(){
        return{
            cartData: store.state.cartData,
        }
    },


    computed: {
        cart(){
            return this.cartData[0];
        }
    },

    created(){
        // mini cart is on every page, that's why, we cal it once here
        store.getCart();
    },

    methods:{
        
        currencyUSD(value, sign = '$') {
            if (!value){
                return 0;
            } 
            return sign + (value/100).toFixed( 2 );
        },

        // Remove item from cart
        remove(item){
            let found = this.cart.items.find(product => product.variant_id == item.variant_id);
            if(found){
                this.$delete(this.cart.items, this.cart.items.indexOf(found));

            }
        },

        // Increment item by 1
        increment(item){
            
            let found = this.cart.items.find(product => product.variant_id == item.variant_id);
            if (found) {
                this.updateCart(found, 1);
            }


        },

        // Decrement item by 1
        decrement(item){
            let found = this.cart.items.find(product => product.variant_id == item.variant_id);
            if (found) {

                if (item.quantity > 0) {
                    this.updateCart(found, -1 );
                }
            }

        },

        updateCart(item, quantity){


            let q = quantity + item.quantity;

            let data = {
                quantity: q,
                id: item.key
            }

            if (q < 1) {
                this.remove(item);
            }

            axios.post('/cart/change.js', data )
                .then( (response) => {

                    // Find the current item and new item to compare the quanity
                    let currentItem = this.cartData[0].items.find(product => product.variant_id == item.variant_id);
                    let newItem = response.data.items.find(product => product.variant_id == item.variant_id);

                    // If item exist
                    if (currentItem) {
                        // check if item quantity changed. Only change.js can detect this on response
                        if(quantity > 0 && currentItem.quantity == newItem.quantity){

                            new Noty({
                                type: 'warning',
                                timeout: 3000,
                                layout: 'topRight',
                                text: 'No more in stock'
                            }).show();
                            
                        }else{
                            // add one to current item
                            currentItem.quantity += quantity;
                             new Noty({
                                type: 'success',
                                timeout: 3000,
                                layout: 'topRight',
                                text: 'Your cart items updated'
                            }).show();

                        }
                    }
                    
                    
                   

                })
                .catch(function (error) {

                    console.log(error);

                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'There was something wrong!!'
                    }).show();
                });
           

        }

     

    },

   
});

// Delimiters changed to ES6 template string style
MiniCart.config.compilerOptions.delimiters = ['${', '}']

MiniCart.mount('.mini-cart')