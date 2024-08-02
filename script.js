
















































 const workArea = document.querySelector(`.work-area`);
const transformButton = document.getElementById('transformButton');
const copyButton = document.getElementById('copyButton');
const outputText = document.getElementById('outputText');

const containerIconStars = `<div class="container-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99581 3.99658C6.99581 6.20664 5.2042 7.99825 2.99414 7.99825C5.2042 7.99825 6.99581 9.78986 6.99581 11.9999C6.99581 9.78986 8.78741 7.99825 10.9975 7.99825C8.78741 7.99825 6.99581 6.20664 6.99581 3.99658Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0021 16.0017C18.0021 13.2392 15.7626 10.9996 13 10.9996C15.7626 10.9996 18.0021 8.76013 18.0021 5.99756C18.0021 8.76013 20.2416 10.9996 23.0042 10.9996C20.2416 10.9996 18.0021 13.2392 18.0021 16.0017Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9978 14.501C10.9978 16.711 9.20615 18.5026 6.99609 18.5026C9.20615 18.5026 10.9978 20.2942 10.9978 22.5043C10.9978 20.2942 12.7894 18.5026 14.9994 18.5026C12.7894 18.5026 10.9978 16.711 10.9978 14.501Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg></div>`;
const containerIconBook = `<div class="container-icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.9998 17.8658C10.971 15.8359 7.91272 15.4628 5.50472 16.7463C4.82144 17.1105 3.99609 16.6613 3.99609 15.887V6.79116C3.99609 6.1549 4.29022 5.54264 4.80843 5.17349C7.29447 3.40075 10.7689 3.62985 12.9998 5.86078C15.2308 3.62985 18.7052 3.40075 21.1913 5.17349C21.7095 5.54264 22.0036 6.1549 22.0036 6.79116V15.887C22.0036 16.6613 21.1782 17.1115 20.495 16.7463C18.087 15.4628 15.0287 15.8359 12.9998 17.8658Z" stroke="#FFF0EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M5.50391 20.8845C7.91191 19.601 10.9702 19.9741 12.999 22.004C15.0279 19.9741 18.0861 19.601 20.4941 20.8845" stroke="#FFF0EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M13.0002 17.8663V5.86133" stroke="#FFF0EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg></div>`;



let codeLanguage = 'python';

// Функция для обработки текста
const processText = (text) => {
    let processedText = text.replace(/<style.*?<\/style>/gs, '')
        .replace(/<script.*?<\/script>/gs, '')
        .replace(/<span (?:class="code-blue".*?|style="[^"]*?font-family: 'Courier New'.*?")>(.*?)<\/span>/g, '<code>$1</code>')
        .replace(/<div style="(?:clear: both; )*background: #(?:f8f8f8|F8F8F8); overflow: auto; width: auto; border: solid #(?:d1d9d7|D1D9D7); border-width: .1em; padding: .2em .6em;">\s*<pre style="margin: 0; line-height: 125%;">(.*?)<\/pre>\s*<\/div>/gs, `<pre class="language-${codeLanguage}"><code>$1</code></pre>`)
        .replace(/<pre style="margin: 0; line-height: 125%;">(.*?)<\/pre>/gs, `<pre class="language-${codeLanguage}"><code>$1</code></pre>`)
        .replace(/<div style="background: #f8f8f8; overflow: auto; width: auto; border: solid gray; border-width: .1em .1em .1em .8em; padding: .2em .6em;">\s*(<code[^>]*>.*?<\/code>\s*)+<\/div>/gs, match => {
            let codeContent = match.replace(/<div[^>]*>|<\/div>/g, '').replace(/<code[^>]*>|<\/code>/g, '');
            return `<pre class="language-${codeLanguage}"><code>${codeContent.trim()}</code></pre>`;
        })
        .replace(/<h1>(.*?)<\/h1>/g, `<div class="h1">$1</div>`)
        .replace(/<h2>(.*?)<\/h2>/g, `<div class="h2">$1</div>`)
        .replace(/<h3>(.*?)<\/h3>/g, `<div class="h3">$1</div>`)
        .replace(/<ul.*?>/g, `<ul class="list">`)
        .replace(/<ol.*?>/g, `<ol class="ordered-list">`)
        .replace(/<figure.*?>/g, `<figure class="img">`)
        .replace(/<figcaption>\s*(?:<em>)*([^]*?)(?:<\/em>)*\s*<\/figcaption>/g, `<p class="grey-text">$1</p>`)
        .replace(/(?<!<figure.*?>)\s*(<img.*?>)/g, `<figure class="img">$1</figure>`)
        .replace(/<table.*?>([^]*?)<\/table>/g, `<div class="overflow-table"><table style="width: 100%;">$1</table></div>`)
        .replace(/<div style="display: flex; justify-content: center;">\s*(<div class="overflow-table">[^]*?<\/div>)\s*<\/div>/g, `$1`)
        .replace(/<colgroup>\s*(?:<col.*?>)+\s*<\/colgroup>/g, '')
        .replace(/<tr style="[^"]*?background-color: (?:#2e765e|#88cdb2);.*?">[^]*?<\/tr>/g, match => match.replace(/<td.*?>/g, `<th>`).replace(/<\/td>/g, `</th>`).replace(/<tr.*?>/g, `<tr>`))
        .replace(/<div style="display: flex; justify-content: center;.*?">\s*<div style="width: 40%;">([^]*?)<\/div>\s*<div class="vert-line-blue-green"><\/div>\s*<div style="width: 40%;">([^]*?)<\/div>\s*<\/div>/g, `<div class="row">$1<div class="vert-line"></div>$2</div>`)
        .replace(/<hr.*?>/g, `<div class="horizontal-line"></div>`)
        .replace(/<div class="lib">/g, '<div class="color-container container-flex blue-container">');

    if (processedText.includes('<div class="block">')) {
        processedText = processedText.replace(/<div class="block">/g, '<div class="main-block">');
    } else {
        processedText = `<div class="main-block">${processedText}</div>`;
    }

    return processedText;
};

// Функция для преобразования кода
const transformCode = () => {
    playAnimation();
    const inputText = workArea.value;
    const transformedText = processText(inputText);
    outputText.value = transformedText;
    copyToClipboard(); // Автоматически копируем текст после преобразования
};

// Функция для копирования текста
const copyToClipboard = () => {
    outputText.select();
    outputText.setSelectionRange(0, 99999); // Для мобильных устройств
    document.execCommand('copy');
};

// Функция для анимации
const playAnimation = () => {
    workArea.classList.remove('work-area--animated');
    workArea.offsetWidth; // Триггер пересчета
    workArea.classList.add('work-area--animated');
};

// Назначение обработчиков событий
transformButton.addEventListener('click', transformCode);
 
