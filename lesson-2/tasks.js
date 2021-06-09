/*
1. Дан код:
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2
d = b++; alert(d);           // 1
c = (2+ ++a); alert(c);      // 5
d = (2+ b++); alert(d);      // 4
alert(a);                    // 3
alert(b);                    // 3
*/

var a = 1, b = 1, c, d;

// Используетс префиксный оператор инкремента. То есть сначала выполняется увеличение значения a на единицу, присвоение полученного значения переменной а, a потом используется полученное значение a, которе равно уже 2.
c = ++a; alert(c);           // 2

// Используется суффиксный оператор инкремента. Для присвоения использется значение переменной b (1), затем значение переменной b увеличивается н единицу и присваивается переменной b (2).
d = b++; alert(d);           // 1

// Сначала выполняется префиксный оператор инкремента. Его результат равен 3 (сначала выполняется увеличение значения a на единицу (3), запись полученного значения в переменную а). Затем происходит сложение 2 + 3. Результат 5 присваивается перменной c.
c = (2 + ++a); alert(c);      // 5

// Сначала выполняется постфиксный оператор инкремента. Его результат равен значению b (2). Значение b после выполнения равно 3. Затем происходит сложение 2 + 2. Результат 4 присваивается переменной d.
d = (2 + b++); alert(d);      // 4

alert(a);                    // 3
alert(b);                    // 3

/*
2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2);
*/

//x будет присвоено значение 5, так как сначала выполнится операция умножение, совмещенное с присваиванием (результат 4), а затем оператор сложения 1 + 4, после чего результат 5 будет присвоен переменной x.
var a = 2;
var x = 1 + (a *= 2);
alert(x)

var a = 34;
var b = -2;

if (a >= 0 && b >= 0) {
    alert(a - b);
}
else if (a < 0 && b < 0) {
    alert(a * b);
}
else {
    alert(a + b);
}

/*
4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.
*/

var num = 12;

switch (num) {
    case 0:
        console.log(num++);
    case 1:
        console.log(num++);
    case 2:
        console.log(num++);
    case 3:
        console.log(num++);
    case 4:
        console.log(num++);
    case 5:
        console.log(num++);
    case 6:
        console.log(num++);
    case 7:
        console.log(num++);
    case 8:
        console.log(num++);
    case 9:
        console.log(num++);
    case 10:
        console.log(num++);
    case 11:
        console.log(num++);
    case 12:
        console.log(num++);
    case 13:
        console.log(num++);
    case 14:
        console.log(num++);
    case 15:
        console.log(num++);
        break;
    default:
        console.log('Wrong numberer')
}

/*
5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
*/

function addition(op1, op2) {
    return op1 + op2;
}

function subtraction(op1, op2) {
    return op1 - op2;
}

function multiplication(op1, op2) {
    return op1 * op2;
}

function division(op1, op2) {
    return op1 / op2;
}

/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).
*/

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'addition':
        case '+':
            return (addition(arg1, arg2));
        case 'subtraction':
        case '-':
            return (subtraction(arg1, arg2));
        case 'multiplication':
        case '*':
            return (multiplication(arg1, arg2));
        case 'division':
        case '/':
            return (division(arg1, arg2));
    }
}

console.log('34 + 56 =', mathOperation(34, 56, 'addition'));
console.log('44 / 3 =', mathOperation(44, 3, '/'));

/*
7. *Сравнить null и 0. Попробуйте объяснить результат.
*/

// при использовании обычного сравнения null эквивалентен _только_ undefined
console.log('(null == 0) is ', null == 0); //false
console.log('(null == NaN) is ', null == NaN); //false
console.log('(null == undefined) is', null == undefined); //true

/*
8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.
*/

function power(val, pow) {
    if (pow < 0) {
        return 1 / power(val, -pow);
    }
    else if (pow > 1) {
        return val * power(val, pow - 1);
    }
    else if (pow == 0) {
        return 1;
    }
    else {
        return val;
    }
}

console.log('2 ** 1 = ', power(2, 1));
console.log('2 ** 3 = ', power(2, 3));
console.log('2 ** 0 = ', power(2, 0));
console.log('2 ** -1 = ', power(2, -1));
console.log('2 ** -2 = ', power(2, -2));