import * as model from './model.js';
import episodeViews from "./views/episodesView.js";
import searchView from "./views/searchView.js"


episodeViews.render(model.state.episodes);


const controlSearchResult = function () {
    // 1 search query
    const query = searchView.getQuery();
    console.log(query)
    if (!query) return;
    model.searchResults(query)

    //2 search and rendering search results
    episodeViews.render(model.state.search.results)

    model.state.search.results = []

}


const init = function () {
    searchView.addHandlerSearch(controlSearchResult);
};

init();