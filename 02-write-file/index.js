const fs = require('fs');
const path = require('path');

const TEXT_GREETING = 'Hello, please enter some text (type `exit` to exit):';
const TEXT_FAREWELL = 'Bye. Have a nice day!';
const FILE_NAME = 'text.txt';

// Выводим приветствие
console.log(TEXT_GREETING);

// Создаем поток записи (создается файл)
const ws = fs.createWriteStream(
    path.resolve(__dirname, FILE_NAME),
    { encoding: 'utf-8' }
);

// Обработываем ввод данных
process.stdin.on('data', d => {
    const str = d.toString(); // преобразуем данные в строку

    // Если был введен 'exit'
    if (str.toLowerCase().trim() === 'exit') {
        process.exit(); // завершаем работу программы
    }

    // Иначе добавляем введенные данные в файл
    ws.write(d);
});

// Сообщение при завершении работы программы
process.on('exit', () => {
    console.log(TEXT_FAREWELL);
});

// Обработка Ctrl + C
process.on('SIGINT', () => {
    process.exit();
});