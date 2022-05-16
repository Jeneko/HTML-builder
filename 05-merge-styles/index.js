const path = require('path');
const { readdir, readFile, writeFile } = require('fs/promises');

const STYLES_DIR = 'styles';
const OUTPUT_FILE = 'project-dist/bundle.css';

async function copyCss() {
    // Получаем содержимое директории STYLES_DIR
    const DirentArr = await readdir(
        path.resolve(__dirname, STYLES_DIR),
        { withFileTypes: true }
    );

    // Находим все css файлы
    const cssFilesArr = DirentArr.filter(el => {
        if (el.isDirectory()) return false;
        if (path.extname(el.name).toLowerCase() !== '.css') return false;
        return true;
    });

    // Сохраняем содержимое css файлов в массив
    const cssArr = [];
    for (let i = 0; i < cssFilesArr.length; i++) {
        cssArr[i] = await readFile(
            path.resolve(__dirname, STYLES_DIR, cssFilesArr[i].name),
            'utf-8'
        );
    }

    // Копируем содержимое массива в OUTPUT_FILE
    writeFile(
        path.resolve(__dirname, OUTPUT_FILE),
        cssArr.join('')
    )
}

copyCss();