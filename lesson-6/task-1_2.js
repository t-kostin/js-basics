/* 
1. Доработать модуль корзины:
    a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить»
       без перезагрузки страницы
    b. Привязать к событию покупки товара пересчет корзины и обновление ее
       внешнего вида
2 У товара может быть несколько изображений. Нужно:
    a. Реализовать функционал показа полноразмерных картинок товара в
       модальном окне
    b. Реализовать функционал перехода между картинками внутри модального 
       окна ("листалка")
*/
'use strict';

const products = [
    {
        key: '27920',
        model: 'Xiaomi Redmi Note 9',
        image: 'img/small/xiaomi-redmi-note-9-green-1s.jpg',
        gallery: [
            'img/large/xiaomi-redmi-note-9-green-1.png',
            'img/large/xiaomi-redmi-note-9-green-2.png',
            'img/large/xiaomi-redmi-note-9-green-3.png',
        ],
        screen: {
            type: 'IPS LCD',
            size: 6.53,
            resolution: {
                horizontal: 1080,
                vertical: 2340,
            },
        },
        ram: 4,
        memory: 64,
        color: 'Forest Green',
        price: 19000,
        quantity: 20,
    },
    {
        key: '27922',
        model: 'Xiaomi Redmi Note 9',
        image: 'img/small/xiaomi-redmi-note-9-grey-1s.jpg',
        gallery: [
            'img/large/xiaomi-redmi-note-9-grey-1.png',
            'img/large/xiaomi-redmi-note-9-grey-2.png',
            'img/large/xiaomi-redmi-note-9-grey-3.png',
        ],
        screen: {
            type: 'IPS LCD',
            size: 6.53,
            resolution: {
                horizontal: 1080,
                vertical: 2340,
            },
        },
        ram: 6,
        memory: 128,
        color: 'Midnight Grey',
        price: 20000,
        quantity: 0, // Button in catalog will be disabled.
    },
    {
        key: '24566',
        model: 'Motorola Moto G Stylus 5G',
        image: 'img/small/motorola-moto-g-stylus-5g-1s.jpg',
        gallery: [
            'img/large/motorola-moto-g-stylus-5g-1.png',
            'img/large/motorola-moto-g-stylus-5g-2.png',
            'img/large/motorola-moto-g-stylus-5g-3.png',
        ],
        screen: {
            type: 'LTPS IPS LCD',
            size: 6.8,
            resolution: {
                horizontal: 1080,
                vertical: 2400,
            }
        },
        ram: 6,
        memory: 256,
        color: 'Cosmic Emerald',
        price: 30000,
        quantity: 20,
    },
    {
        key: '11350',
        model: 'Apple iPhone 12',
        image: 'img/small/apple-iphone-12-1s.jpg',
        gallery: [
            'img/large/apple-iphone-12-1.png',
            'img/large/apple-iphone-12-2.png',
        ],
        screen: {
            type: 'Super Retina XDR OLED',
            size: 6.1,
            resolution: {
                horizontal: 1070,
                vertical: 2532,
            }
        },
        ram: 4,
        memory: 64,
        color: 'Black',
        price: 75000,
        quantity: 30,
    },
    {
        key: '22451',
        model: 'Samsung Galaxy A50',
        image: 'img/small/samsung-galaxy-a50-1s.jpg',
        gallery: [
            'img/large/samsung-galaxy-a50-1.png',
            'img/large/samsung-galaxy-a50-2.png',
            'img/large/samsung-galaxy-a50-3.png',
        ],
        screen: {
            type: 'Super AMOLED',
            size: 6.4,
            resolution: {
                horizontal: 1080,
                vertical: 2340,
            }
        },
        ram: 4,
        memory: 128,
        color: 'Blue',
        price: 25000,
        quantity: 20,
    },
];

const basket = {
    idName: 'basket',
    goods: [],
    addItem: function (item) {
        let pos = this.goods.findIndex(a => a.model === item.model)
        if (pos < 0) {
            this.goods.push(
                {
                    model: item.model,
                    price: item.price,
                    quantity: 1
                }
            );
        }
        else {
            this.goods[pos].quantity++;
        }
        this.show();
    },
    removeItem: function (item) {
        let pos = this.goods.findIndex(a => a.model === item.model)
        if (pos >= 0) {
            if (--this.goods[pos].quantity < 1) {
                this.goods.splice(pos, 1);
            }
        }
        this.show();
    },
    clear: function () {
        this.goods = [];
        this.show()
    },
    totalPrice: function () {
        let basket_total = 0;
        for (let pos in this.goods) {
            basket_total += this.goods[pos].price * this.goods[pos].quantity;
        }
        return basket_total;
    },
    itemsQuantity: function () {
        let result = 0;
        this.goods.forEach(item => result += item.quantity);
        return result;
    },
    show: function () {
        const basketElement = document.getElementById(this.idName);
        const items = this.itemsQuantity();
        basketElement.innerHTML = '';
        if (items === 0) {
            basketElement.textContent = 'Basket is empty.';
        } else {
            this.addHeading(basketElement);
            this.goods.forEach(item => this.addPosition(basketElement, item));
            this.addTotal(basketElement);
        }
    },

    addTotal: function (basketElement) {
        const basketPosition = document.createElement('div');
        basketPosition.className = 'basket__position';

        const basketItem = document.createElement('div');
        basketItem.className = 'basket__item';
        basketItem.textContent = 'Basket Total:';

        const basketQuantity = document.createElement('div');
        basketQuantity.className = 'basket__quantity';
        basketQuantity.textContent = this.itemsQuantity();

        const basketPrice = document.createElement('div');
        basketPrice.className = 'basket__price';
        basketPrice.textContent = '';

        const basketTotal = document.createElement('div');
        basketTotal.className = 'basket__total';
        basketTotal.textContent = this.totalPrice();

        const basketButton = document.createElement('div');
        basketButton.className = 'basket__button';
        basketButton.textContent = '';

        basketPosition.append(
            basketItem,
            basketQuantity,
            basketPrice,
            basketTotal,
            basketButton
        );

        basketElement.append(basketPosition);
    },

    addPosition: function (basketElement, item) {
        const basketPosition = document.createElement('div');
        basketPosition.className = 'basket__position';

        const basketItem = document.createElement('div');
        basketItem.className = 'basket__item';
        basketItem.textContent = item.model;

        const basketQuantity = document.createElement('div');
        basketQuantity.className = 'basket__quantity';
        basketQuantity.textContent = item.quantity;

        const basketPrice = document.createElement('div');
        basketPrice.className = 'basket__price';
        basketPrice.textContent = item.price;

        const basketTotal = document.createElement('div');
        basketTotal.className = 'basket__total';
        basketTotal.textContent = item.quantity * item.price;

        const basketButton = document.createElement('div');
        basketButton.className = 'basket__button';
        basketButton.textContent = '';

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.onclick = () => {
            item.quantity++;
            this.show();
        };

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.onclick = () => {
            item.quantity--;
            if (item.quantity < 1) this.removeItem(item);
            this.show();
        }

        basketButton.append(
            plusButton,
            minusButton
        );


        basketPosition.append(
            basketItem,
            basketQuantity,
            basketPrice,
            basketTotal,
            basketButton
        );

        basketElement.append(basketPosition);

    },

    addHeading: function (basketElement) {

        basketElement.textContent = '';
        const basketPosition = document.createElement('div');
        basketPosition.className = 'basket__position';

        const basketItem = document.createElement('div');
        basketItem.className = 'basket__item';
        basketItem.textContent = 'Item';

        const basketQuantity = document.createElement('div');
        basketQuantity.className = 'basket__quantity';
        basketQuantity.textContent = 'Quantity';

        const basketPrice = document.createElement('div');
        basketPrice.className = 'basket__price';
        basketPrice.textContent = 'Price';

        const basketTotal = document.createElement('div');
        basketTotal.className = 'basket__total';
        basketTotal.textContent = 'Total';

        const basketButton = document.createElement('div');
        basketButton.className = 'basket__button';
        basketButton.textContent = '';

        basketPosition.append(
            basketItem,
            basketQuantity,
            basketPrice,
            basketTotal,
            basketButton
        );

        basketElement.append(basketPosition);
    },
};

const catalog = {
    idName: 'catalog',
    put: function (product) {
        const catalogElement = document.getElementById(this.idName);
        const itemCard = document.createElement('div');
        itemCard.className = 'card';

        const cardModel = document.createElement('h2');
        cardModel.className = 'card__header';
        cardModel.textContent = product.model;

        const cardImage = document.createElement('img');
        cardImage.className = 'card__image';
        cardImage.src = product.image;
        cardImage.alt = product.model;
        cardImage.dataset.key = product.key;
        cardImage.addEventListener('click', (event) => this.clickHandler(event));

        const cardScreenSize = document.createElement('p');
        cardScreenSize.textContent = `Screen size: ${product.screen.size} in`;

        const cardScreenType = document.createElement('p');
        cardScreenType.textContent = `Screen type: ${product.screen.type}`;

        const cardScreenResolution = document.createElement('p');
        cardScreenResolution.textContent = `Screen resolution:\
            ${product.screen.resolution.horizontal} ×\
            ${product.screen.resolution.vertical}`;

        const cardRam = document.createElement('p');
        cardRam.textContent = `RAM: ${product.ram}`;

        const cardMemory = document.createElement('p');
        cardMemory.textContent = `Memory: ${product.memory}`;

        const cardColor = document.createElement('p');
        cardColor.textContent = `Color: ${product.color}`;

        const cardPrice = document.createElement('p');
        cardPrice.textContent = `Price: ${product.price} \u20bd`;

        itemCard.append(
            cardModel,
            cardImage,
            cardScreenType,
            cardScreenSize,
            cardScreenResolution,
            cardRam,
            cardMemory,
            cardColor,
            cardPrice,
        );
        if (product.quantity > 0) {
            const cardButton = document.createElement('button');
            cardButton.textContent = 'Add to Basket';
            cardButton.type = 'button';
            cardButton.onclick = () => basket.addItem(product);
            itemCard.append(cardButton);
        } else {
            const cardNotAvailable = document.createElement('p');
            cardNotAvailable.textContent = 'Not available';
            itemCard.append(cardNotAvailable);
        }
        catalogElement.append(itemCard);
    },
    clickHandler: function (event) {
        const currentProductIndex = products.findIndex(element => element.key === event.target.dataset.key);
        gallery.show(products[currentProductIndex].gallery);
    },
};

const gallery = {

    init: function () {
        const closeElement = document.querySelector('img.wrapper__close');
        closeElement.addEventListener('click', () => this.close());

        const leftArrow = document.querySelector('img.wrapper__left');
        leftArrow.addEventListener('click', () => this.left());

        const rightArrow = document.querySelector('img.wrapper__right');
        rightArrow.addEventListener('click', () => this.right());
    },

    show: function (gallery) {
        this.images = gallery;
        this.pointer = 0;
        const imageElement = document.querySelector('img.wrapper__image');
        imageElement.src = this.images[this.pointer];
        const galleryElement = document.querySelector('#gallery');
        galleryElement.classList.toggle('hidden');
    },

    left: function () {
        if (this.pointer > 0) {
            const imageElement = document.querySelector('img.wrapper__image');
            imageElement.src = this.images[--this.pointer];
        }
    },

    right: function () {
        if (this.pointer < (this.images.length - 1)) {
            const imageElement = document.querySelector('img.wrapper__image');
            imageElement.src = this.images[++this.pointer];
        }

    },

    close: function () {
        const galleryElement = document.querySelector('#gallery');
        galleryElement.classList.toggle('hidden');
    },

};

gallery.init();
basket.show();
products.forEach(item => catalog.put(item));