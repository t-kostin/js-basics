/*
1. Написать функцию, преобразующую число в объект. Передавая на вход 
число от 0 до 999, мы должны получить на выходе объект, в котором в 
соответствующих свойствах описаны единицы, десятки и сотни. Например, 
для числа 245 мы должны получить следующий объект: {‘единицы’: 5, 
‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо 
выдать соответствующее сообщение с помощью console.log и вернуть 
пустой объект.
*/

console.log('Task 1\n======\n');

function ranks(number) {
    const result = {};
    if (number >= 0 && number <= 999) {
        const rank_names = ['единицы', 'десятки', 'сотни'];
        for (let rank = 0; rank < 3; rank++) {
            result[rank_names[rank]] = number % 10;
            number = Math.floor(number / 10);
        }
    }
    else {
        console.log('Argument out of interval [0, 999]');
    }
    return result;
}

let num_obj = ranks(256);
for (let key in num_obj) {
    console.log(key + ': ' + num_obj[key]);
}
num_obj = ranks(1299);

/*
2.Продолжить работу с интернет-магазином:
2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. 
Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную 
базу.
*/

/*
Товары в корзине по прежнему массив, но массив объектов с атрибутами 
model и price.
Кроме того мы определяем типичные операции с корзиной через методы.
*/


console.log('\nTask 2\n======\n');

let basket = {
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
    },
    removeItem: function (item) {
        let pos = this.goods.findIndex(a => a.model === item.model)
        if (pos >= 0) {
            if (--this.goods[pos].quantity < 1) {
                this.goods.splice(pos, 1);
            }
        }

    },
    totalPrice: function () {
        let basket_total = 0;
        for (let pos in this.goods) {
            basket_total += this.goods[pos].price * this.goods[pos].quantity;
        }
        return basket_total;
    }
};

let goods = [
    {
        model: 'Xiaomi Redmi Note 9 4/128Gb Midnight Grey',
        price: 18990
    },
    {
        model: 'Huawei P Smart 2021 4/128Gb Black',
        price: 14990
    },
    {
        model: 'Samsung A715 Galaxy A71 6/128Gb Black',
        price: 28790
    }
];

console.log('\nAdding some goods');
basket.addItem(goods[0]);
basket.addItem(goods[0]);
basket.addItem(goods[1]);
basket.addItem(goods[2]);
basket.addItem(goods[2]);
for (let i in basket.goods) {
    console.log(basket.goods[i].model + ' price: ' + basket.goods[i].price + ', quantity: ' +
        basket.goods[i].quantity);
}
console.log('Basket total ' + basket.totalPrice())

console.log('\nRemoving Huawei and Samsung');
basket.removeItem(goods[2]);
basket.removeItem(goods[1]);
for (let i in basket.goods) {
    console.log(basket.goods[i].model + ' price: ' + basket.goods[i].price + ', quantity: ' +
        basket.goods[i].quantity);
}
console.log('Basket total ' + basket.totalPrice());

/*
3.* Подумать над глобальными сущностями. К примеру, сущность «Продукт» в 
интернет-магазине актуальна не только для корзины, но и для каталога. 
Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру 
для различных модулей сайта, но в разных местах давал возможность 
вызывать разные методы.
*/

/*
Каждый объект товара можно расширить дополнительными атрибутами, 
такими как цвет, объем памяти, дата поставки партии, общее количество на складе, etc.

Например:
*/

console.log('\nTask 3\n======\n');

let moto_phone = {
    model: 'Motorola Moto G Stylus 5G',
    screen: {
        type: 'LTPS IPS LCD',
        size: 6.8,
        res: {
            horiz: 1080,
            vert: 2400
        }
    },
    ram: 6,
    memory: 256,
    color: 'Cosmic Emerald',
    price: 28850,
    quantity: 150
    // etc.
};

/*
При этом этот объект остается совместимым с методами корзины, которая 
описана выше, так как атрибуты model и price определены и несут ту же 
смысловую нагрузку.
*/

console.log('\nAdding Motorola');
basket.addItem(moto_phone);
for (let i in basket.goods) {
    console.log(basket.goods[i].model + ' price: ' + basket.goods[i].price + ', quantity: ' +
        basket.goods[i].quantity);
}
console.log('Basket total ' + basket.totalPrice());
