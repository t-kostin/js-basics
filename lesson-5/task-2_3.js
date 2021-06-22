/* 
2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
2.1. Пустая корзина должна выводить строку «Корзина пуста»;
2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

3*. Сделать так, чтобы товары в каталоге выводились при помощи JS:
3.1. Создать массив товаров (сущность Product);
3.2. При загрузке страницы на базе данного массива генерировать вывод из него. HTML-код должен содержать только div id=”catalog” без вложенного кода. Весь вид каталога генерируется JS.
*/
'use strict';

const products = [
    {
        model: 'Xiaomi Redmi Note 9',
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
        model: 'Xiaomi Redmi Note 9',
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
        model: 'Motorola Moto G Stylus 5G',
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
        model: 'Apple iPhone 12',
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
        model: 'Samsung Galaxy A50',
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
        if (items === 0) {
            basketElement.textContent = 'Basket is empty.';
        } else {
            const price = this.totalPrice();
            basketElement.textContent = `There are ${items} items in your basket worth ${price} ₽.`;
        }
    }
};

const catalog = {
    idName: 'catalog',
    put: function (product) {
        const catalogElement = document.getElementById(this.idName);
        const itemCard = document.createElement('div');
        itemCard.className = 'card';

        const cardModel = document.createElement('h2');
        cardModel.textContent = product.model;
        itemCard.append(cardModel)

        const cardScreenSize = document.createElement('p');
        cardScreenSize.textContent = 'Screen size: ' + product.screen.size;

        const cardScreenType = document.createElement('p');
        cardScreenType.textContent = 'Screen type: ' + product.screen.type;

        const cardScreenResolution = document.createElement('p');
        cardScreenResolution.textContent = 'Screen resolution: ' +
            product.screen.resolution.horizontal + ' x ' +
            product.screen.resolution.vertical;

        const cardRam = document.createElement('p');
        cardRam.textContent = 'RAM: ' + product.ram;

        const cardMemory = document.createElement('p');
        cardMemory.textContent = 'Memory: ' + product.memory;

        const cardColor = document.createElement('p');
        cardColor.textContent = 'Color: ' + product.color;

        const cardPrice = document.createElement('p');
        cardPrice.textContent = 'Price: ' + product.price + ' \u20bd';

        itemCard.append(
            cardModel,
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
}

basket.show();
products.forEach(item => catalog.put(item));