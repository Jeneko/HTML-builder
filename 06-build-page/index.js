const path = require('path');
const { readFile, writeFile, copyFile, mkdir, readdir } = require('fs/promises');

const HTML_FILE = 'template.html';
const OUTPUT_DIR = 'project-dist';
const STYLES_DIR = 'styles';
const ASSETS_DIR = 'assets';
const COMPONENTS_DIR = 'components';

createOutputDir(() => {
    buildHtml();
    bundleStyles();
    copyAssets(ASSETS_DIR);
});

async function createOutputDir(cb) {
    // Создаем выходную директорию проекта
    await mkdir(
        path.resolve(__dirname, OUTPUT_DIR), // путь создаваемой директории
        { recursive: true } // позволяет избежать ошибки, если директория уже существует
    );

    cb();
}

async function buildHtml() {
    // Читаем HTML файл
    let html = await readFile(
        path.resolve(__dirname, HTML_FILE),
        { encoding: 'utf-8' }
    );

    // Ищем в нем шаблонные теги
    const usedComponents = html.matchAll(/{{(.+?)}}/g);

    // Меняем шаблонные теги на содержимое соответствующих компонентов
    for (let component of usedComponents) {
        const componentHtml = await readFile(
            path.resolve(__dirname, COMPONENTS_DIR, component[1] + '.html'),
            { encoding: 'utf-8' }
        );
        html = html.replace(component[0], componentHtml);
    }

    // Сохраняем итоговый код в OUTPUT_DIR/index.html
    writeFile(
        path.resolve(__dirname, OUTPUT_DIR, 'index.html'),
        html
    );
}

async function copyAssets(from) {
    // Создаем директорию (если еще не создана)
    await mkdir(
        path.resolve(__dirname, OUTPUT_DIR, from), // путь создаваемой директории
        { recursive: true } // позволяет избежать ошибки, если директория уже существует
    );

    // Получаем содержимое директории
    const direntArr = await readdir(path.resolve(__dirname, from), { withFileTypes: true });

    // Для каждого элемента директории
    for (let entry of direntArr) {
        if (entry.isDirectory()) { // Если элемент директория
            copyAssets(path.join(from, entry.name)); // Рекурсивно копируем эту директорию
        } else { // иначе это файл, который копируем в целевую директорию
            copyFile(
                path.resolve(__dirname, from, entry.name),
                path.resolve(__dirname, OUTPUT_DIR, from, entry.name)
            );
        }
    }
}

async function bundleStyles() {
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

    // Копируем содержимое массива в OUTPUT_DIR
    writeFile(
        path.resolve(__dirname, OUTPUT_DIR, 'style.css'),
        cssArr.join('')
    );
}