import * as model from "./model.js";
import episodeViews from "./views/episodesView.js";
import searchView from "./views/searchView.js";

import numberOfEpisodesView from "./views/numberOfEpisodesView.js";
import selectInputView from "./views/selectInputView.js";
import selectShowView from "./views/selectShowView.js";
import showsView from "./views/showsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlLoadingPageDefault = async function () {
  try {
    //importing all episodes from API
    await model.importAllEpisodes();

    selectShowView.render(model.state.shows);
    numberOfEpisodesView.render(model.state.shows, model.state.shows);
    showsView.render(model.state.shows);
    selectInputView.render(model.state.shows);
  } catch (err) {
    console.error(err);
  }
};

const controlSelectedResults = function () {
  const query = selectInputView.getQuery();
  // console.log(model.state.episodes)
  //!IMPORTANT is this if statement following the MVC pattern? or it need to be added to model?
  if (query === 0) return showsView.render(model.state.shows);
  console.log(query);
  model.findSelectedEpisode(query);
  console.log(model.state.selection.selected);
  showsView.render(model.state.selection.selected);
};

//function which is going to control chosen show and render it on web plus change the possible episodes to choose
const controlSelectedShowResults = function () {
  //   //returning value of parent element from the selectShowView
  const query = selectShowView.getQuery();
  // console.log(model.state.episodes)

  if (query === 0) return showsView.render(model.state.shows);
  console.log(query);
  model.findSelectedEpisode(query);
  console.log(model.state.selection.selected);
  showsView.render(model.state.selection.selected);
};

const controlSearchResult = function () {
  // 1 search query
  const query = searchView.getQuery();

  if (query === "") {
    showsView.render(model.state.shows);
    model.state.search.results = [];
    numberOfEpisodesView.render(model.state.shows, model.state.shows);
    return;
  }

  console.log(query);
  if (!query) return;
  model.searchResults(query);

  //2 search and rendering search results
  showsView.render(model.state.search.results);
  // console.log(model.state.search.results)
  numberOfEpisodesView.render(model.state.search.results, model.state.shows);
  model.state.search.results = [];
};

// selectInputView.render(model.state.episodes);

//init function which is going to lunch all needed function following the MVC and Observer patter
const init = function () {
  // there is need to reconsider the way how to join each part of the code
  //because the page is loading two times from search results and window load event
  searchView.addHandlerSearch(controlSearchResult);

  //this function controlling the selection from the choose an show
  selectShowView.addHandlerEpisode(controlSelectedShowResults);

  // episodeViews.addHandlerEpisode(controlLoadingPageDefault);

  controlLoadingPageDefault();

  selectInputView.addHandlerEpisode(controlSelectedResults);
};

init();
