import * as model from './model.js';
import episodeViews from "./views/episodesView.js";
import searchView from "./views/searchView.js";
import numberOfEpisodesView from './views/numberOfEpisodesView.js';


episodeViews.render(model.state.episodes);

const controlLoadingPageDefault = function () {
    episodeViews.render(model.state.episodes);
}


const controlSearchResult = function () {
    // 1 search query
    const query = searchView.getQuery();
    console.log(query)
    if (!query) return;
    model.searchResults(query)

    //2 search and rendering search results
    episodeViews.render(model.state.search.results)
    // console.log(model.state.search.results)
    numberOfEpisodesView.render(model.state.search.results, model.state.episodes)
    model.state.search.results = []

}


const init = function () {
    searchView.addHandlerSearch(controlSearchResult);
    episodeViews.addHandlerEpisode(controlLoadingPageDefault);
};

init();