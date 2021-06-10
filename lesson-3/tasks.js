/* 
1. С помощью цикла while вывести все простые числа в промежутке
от 0 до 100.
 */

let number = 2;
while (number <= 100) {
    let i = 2;
    while (i < number) {
        if (!(number % i)) {
            break;
        }
        i++;
    }
    if (i >= number) {
        console.log('Number ' + number + ' is prime.');
    }
    number++;
}


/*
2. С этого урока начинаем работать с функционалом интернет-магазина.
Предположим, есть сущность корзины. Нужно реализовать функционал
подсчета стоимости корзины в зависимости от находящихся в ней товаров.
 */

let basket = [
    ['Xiaomi Redmi Note 9 4/128Gb Midnight Grey', 18990, 1],
    ['Huawei P Smart 2021 4/128Gb Black', 14990, 2],
    ['Samsung A715 Galaxy A71 6/128Gb Black', 28790, 1]
];

/*
3. Товары в корзине хранятся в массиве. Задачи:
a) Организовать такой массив для хранения товаров в корзине;
b) Организовать функцию countBasketPrice, которая будет считать
стоимость корзины.
 */

function countBasketPrice(basket) {
    let basket_price = 0;
    for (let i in basket) {
        basket_price += basket[i][1] * basket[i][2];
    }
    return basket_price;
}

console.log('Total basket price: ' + countBasketPrice(basket));

/*
4.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.
Выглядеть это должно так:
for(…){// здесь пусто}
 */

for (let i = 0; i < 10; console.log(i++));

/*
5. *Нарисовать пирамиду с помощью console.log, как показано на рисунке,
только у вашей пирамиды должно быть 20 рядов, а не 5:
x
xx
xxx
xxxx
xxxxx
 */

let str = 'x';
while (str.length <= 20) {
    console.log(str);
    str += 'x';
}
