const path = require('path');
const { mkdir, copyFile, readdir } = require('fs/promises');

const DIR_A = 'files';
const DIR_B = 'files-copy';

async function copyDir() {
    // Создаем директорию DIR_B (если еще не создана)
    await mkdir(
        path.resolve(__dirname, DIR_B), // путь создаваемой директории
        { recursive: true } // позволяет избежать ошибки, если DIR_B уже существует
    )

    // Получаем содержимое директории DIR_A
    const direntArr = await readdir(path.resolve(__dirname, DIR_A));

    // Копируем содержимое DIR_A в DIR_B
    for (let entry of direntArr) {
        copyFile(
            path.resolve(__dirname, DIR_A, entry),
            path.resolve(__dirname, DIR_B, entry)
        )
    }
}

copyDir();