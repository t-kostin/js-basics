/* 
1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые
html-теги по своему желанию. Доска должна быть разлинована соответствующим образом,
т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, 
столбцы – латинскими буквами A, B, C, D, E, F, G, H.
*/
'use strict';

const board = {

    table: 'board',
    topLabel: 'top_label',
    rightLabel: 'right_label',
    bottomLabel: 'bottom_label',
    leftLabel: 'left_label',
    corner: 'corner',
    white: 'white',
    black: 'black',
    letters: 'ABCDEFGH',
    colorSelector: true,

    addCell: function (className, content) {
        const newCell = document.createElement('th');
        newCell.className = className;
        newCell.append(content);
        return newCell;
    },

    addRow: function (rowNumber) {
        const newRow = document.createElement('tr');
        const leftLabel = this.addCell(this.leftLabel, rowNumber);
        newRow.appendChild(leftLabel);
        for (let column = 0; column < 8; column++) {
            const currentColor = this.colorSelector ? this.white : this.black;
            const newCell = this.addCell(currentColor, '');
            newRow.appendChild(newCell);
            this.colorSelector = !this.colorSelector;
        }
        this.colorSelector = !this.colorSelector;
        const rightLabel = this.addCell(this.rightLabel, rowNumber);
        newRow.appendChild(rightLabel);
        return newRow;
    },

    addLabelRow: function (className) {
        const labelRow = document.createElement('tr');
        const leftCorner = this.addCell(this.corner, '');
        labelRow.appendChild(leftCorner);
        for (let column = 0; column < 8; column++) {
            const newCell = this.addCell(className, this.letters[column]);
            labelRow.appendChild(newCell);
        }
        const rightCorner = this.addCell(this.corner, '');
        labelRow.appendChild(rightCorner);
        return labelRow;
    },

    create: function (idName) {
        const boardElement = document.getElementById(idName);
        const chessBoard = document.createElement('table');
        chessBoard.className = this.table;
        const topRow = this.addLabelRow(this.topLabel);
        chessBoard.appendChild(topRow);
        for (let row = 8; row > 0; row--) {
            const newRow = this.addRow(row);
            chessBoard.appendChild(newRow);
        }
        const bottomRow = this.addLabelRow(this.bottomLabel);
        chessBoard.appendChild(bottomRow);
        boardElement.appendChild(chessBoard);
    }
};

board.create('chess');
