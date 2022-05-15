const fs = require('fs');
const path = require('path');

// Создаем объект потока чтения из файла
new fs.ReadStream(
    path.resolve(__dirname, 'text.txt'), // путь до файла
    { encoding: 'utf-8' } // кодировка файла (чтобы не вызывать toString)
).pipe(process.stdout); // используя pipe направляем поток чтения
                        // в поток вывода в консоль
