const path = require('path');
const { readdir, stat } = require('fs/promises');

const FOLDER = 'secret-folder';

async function readDirectory() {
    // Получаем содержимое директории (в виде массива объектов класса Dirent)
    const direntArr = await readdir(
        path.resolve(__dirname, FOLDER),
        { withFileTypes: true }
    );

    // Проходим по элементам полученного массива
    for (let entry of direntArr) {
        // Если текущий элемент директория - переходим к следующему элементу
        if (entry.isDirectory()) continue;

        const ext = path.extname(entry.name).slice(1); // Получаем расширение файла
        // Получаем статистику текущего элемента (в виде объекта класса Stats)
        const curStat = await stat(path.resolve(__dirname, FOLDER, entry.name));

        // Выводим полученные данные
        console.log(`${entry.name} - ${ext} - ${curStat.size}b`);
    }
}

readDirectory();