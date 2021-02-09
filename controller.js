import * as model from './model.js';
import episodeViews from "./views/episodesView.js";
import searchView from "./views/searchView.js";
import numberOfEpisodesView from './views/numberOfEpisodesView.js';
import selectInputView from './views/selectInputView.js'


episodeViews.render(model.state.episodes);

const controlLoadingPageDefault = function () {
    numberOfEpisodesView.render(model.state.episodes, model.state.episodes)
    episodeViews.render(model.state.episodes);
    selectInputView.render(model.state.episodes);

}

const controlSelectedResults = function () {
    const query = selectInputView.getQuery();
    // console.log(model.state.episodes)
    if (query === 0) return episodeViews.render(model.state.episodes);
    console.log(query)
    model.findSelectedEpisode(query);
    console.log(model.state.selection.selected);
    episodeViews.render(model.state.selection.selected);

}


const controlSearchResult = function () {
    // 1 search query
    const query = searchView.getQuery();
    if (query === "") return controlLoadingPageDefault(); // Is it efficient?  <LOL> 
    console.log(query)
    if (!query) return;
    model.searchResults(query)

    //2 search and rendering search results
    episodeViews.render(model.state.search.results)
    // console.log(model.state.search.results)
    numberOfEpisodesView.render(model.state.search.results, model.state.episodes)
    model.state.search.results = []

}

// selectInputView.render(model.state.episodes);


const init = function () {
    // there is need to reconsider the way how to join each part of the code
    //because the page is loading two times from search results and window load event
    searchView.addHandlerSearch(controlSearchResult);
    episodeViews.addHandlerEpisode(controlLoadingPageDefault);

    selectInputView.addHandlerEpisode(controlSelectedResults);
};

init();