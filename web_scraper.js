// settings for web scraper


async function pageFunction(context) {
    // jQuery is handy for finding DOM elements and extracting data from them.
    // To use it, make sure to enable the "Inject jQuery" option.
    const $ = context.jQuery;
    const pageTitle = $('div.article__title').first().text().trim();
    const pageDate = $('div.article__info-date').text().trim();
    const pageOpener = $('h1.article__second-title').first().text().trim();
    //const pageText = $('div.article__text').first().text().trim();
    const elements = document.querySelectorAll(".article__text");
    var fullText = '';
    for (let i=0; i < elements.length; i++) {
        fullText = fullText.concat(elements[i].innerText);
    }
    console.log(fullText);

    // Print some information to actor log
    context.log.info(`URL: ${context.request.url} TITLE: ${pageTitle} DATE: ${pageDate}`);

    

    // Return an object with the data extracted from the page.
    // It will be stored to the resulting dataset.
    if((fullText.toLowerCase()).includes('украин')) {
    return {
        url: context.request.url,
        pageTitle,
        pageDate,
        pageOpener,
        fullText
    };
}
}
