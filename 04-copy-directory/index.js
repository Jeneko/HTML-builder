const path = require('path');
const { mkdir, copyFile, readdir, unlink } = require('fs/promises');

const DIR_A = 'files';
const DIR_B = 'files-copy';

async function copyDir() {
    // Создаем директорию DIR_B (если еще не создана)
    await mkdir(
        path.resolve(__dirname, DIR_B), // путь создаваемой директории
        { recursive: true } // позволяет избежать ошибки, если DIR_B уже существует
    );

    // Получаем содержимое директории DIR_B
    const direntArrB = await readdir(path.resolve(__dirname, DIR_B));

    // Очищаем директорию DIR_B от старых файлов
    for (let entry of direntArrB) {
        unlink(
            path.resolve(__dirname, DIR_B, entry)
        );
    }

    // Получаем содержимое директории DIR_A
    const direntArrA = await readdir(path.resolve(__dirname, DIR_A));

    // Копируем содержимое DIR_A в DIR_B
    for (let entry of direntArrA) {
        copyFile(
            path.resolve(__dirname, DIR_A, entry),
            path.resolve(__dirname, DIR_B, entry)
        );
    }
}

copyDir();