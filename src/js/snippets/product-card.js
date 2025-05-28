
// import Swiper and modules styles
import $ from "jquery";

var ProductCard = function (sel) {

    // objet
    var _ = this;
    _.productCards = document.querySelectorAll(sel);
    _.Shopify = window.Shopify 

    // element
    // ---

    // init
    this.init = function () {
        console.log('Product cards: ', _.productCards)
        if( _.productCards ){
            _.productCards.forEach((item, index) => {
                this.setupForm(item)
            })
        }else{
            console.log('Product cards: NO cards in page')
        }
    }
        
    this.setupForm = (card) => {
        let id = card.getAttribute('id');
        const form = card.querySelector(`form`);
        form.addEventListener('change', onVariantChange.bind(this));
        const productInput = form.querySelector(`[name=id]`)

        function onVariantChange() {
            updateVariantStatuses();
            updatePrice();
            updateVariant();
        }

        function updateVariant() {
            const selectedVariant = getCurrentVariant();
            if (!selectedVariant) return;
            console.log('update variant', selectedVariant.id)
            console.log(productInput)
            productInput.value = selectedVariant.id;
        }

        function updateVariantStatuses() {
            const selectedVariant = getCurrentVariant();
            if (!selectedVariant) return;

            form.querySelector('button[type="submit"]').disabled = !selectedVariant.available;
        }

        function updatePrice() {
            const selectedVariant = getCurrentVariant();
            if (!selectedVariant) return;

            const regularPriceEl = card.querySelector('[data-regular-price]');
            const salePriceEl = card.querySelector('[data-sale-price]');

            regularPriceEl.innerHTML = _.Shopify.formatMoney(selectedVariant.price, Shopify.money_format);

            if (salePriceEl) {
                salePriceEl.innerHTML = _.Shopify.formatMoney(selectedVariant.compare_at_price, Shopify.money_format);
            }
        }

        function getCurrentVariant() {
            const formData = new FormData(form);
            const selectedOptions = [];
            const variantsRaw = form.getAttribute('data-variants')
            const variants = JSON.parse(variantsRaw)
            for (const [key, value] of formData.entries()) {
                if (key.startsWith('options[')) {
                    selectedOptions.push(value);
                }
            }

            return variants.find((variant) => variant.options.every((option, index) => option === selectedOptions[index]));
        }
    }
    
    // init
    this.init();

}

let productCard = new ProductCard('.product-card');