// setting for cheerio scraper

async function pageFunction(context) {
    const { $, request, log } = context;
    // The "$" property contains the Cheerio object which is useful
    // for querying DOM elements and extracting data from them.
    const pageTitle = $('div.article__title').first().text();
    const pageDate = $('div.article__info-date').text().trim();
    const pageOpener = $('h1.article__second-title').first().text().trim();
    const fullText = $(".article__text").text();

  // The "request" property contains various information about the web page loaded. 
    const url = request.url;
    
    // Use "log" object to print information to actor log.
    log.info('Page scraped', { url, pageTitle, fullText });

    // Return an object with the data extracted from the page.
    // It will be stored to the resulting dataset.
if((fullText.toLowerCase()).includes('украин')) {
    return {
        url,
        pageTitle,
        pageDate,
        pageOpener,
        fullText
    };
}
}
