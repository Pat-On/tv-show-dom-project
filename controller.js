import "core-js/stable";
import "regenerator-runtime/runtime";

import {
  NAV_PAGES_LIMIT,
  ITEMS_PER_PAGE,
  API_PER_PAGE,
  THRESHOLD_PRE_FETCH,
} from "./config.js";
import * as model from "./model.js";
import episodeViews from "./views/episodesView.js";
import showsView from "./views/showsView.js";
import numberOfEpisodesView from "./views/numberOfEpisodesView.js";
import selectEpisodeView from "./views/selectEpisodeView.js";
import selectShowView from "./views/selectShowView.js";
import searchView from "./views/searchView.js";
import episodesView from "./views/episodesView.js";

import paginationView from "./views/paginationView.js";

const controlPagePagination = async function (valueFromEvent) {
  try {
    const query = valueFromEvent;
    const startingNumberPagination = model.getNextOrPrevPage(query);
    console.log(query);
    const pageShows = await model.selectPage(
      startingNumberPagination,
      ITEMS_PER_PAGE
    );
    console.log(pageShows.length);
    paginationView.render(
      model.state.pagination.firstPage,
      model.state.pagination.lastPage
    );
    selectShowView.render(pageShows);
    showsView.render(pageShows);
  } catch (err) {
    console.error(err);
  }
};

//ASYNC FUNCTION
const controlLoadingPageDefault = async function () {
  try {
    //importing all episodes from API
    const pageShows = await model.selectPage(1, ITEMS_PER_PAGE);
    console.log(pageShows.length);
    paginationView.render(1, model.state.pagination.lastPage);
    selectShowView.render(pageShows);
    showsView.render(pageShows);
    selectEpisodeView.render(model.state.episodes);
  } catch (err) {
    console.error(err);
  }
};

//ASYNC FUNCTION
const controlSelectedResults = async function () {
  try {
    const query = selectShowView.getQuery();
    await model.importEpisodesOfChosenShow(query);

    //!IMPORTANT is this if statement following the MVC pattern? or it need to be added to model?
    if (query === 0) {
      selectEpisodeView.render([]); //empty array to clear the html temporary !TODO
      showsView.render(model.state.shows);
      return;
    }
    numberOfEpisodesView.render(model.state.episodes, model.state.episodes);
    model.findSelectedShow(query);
    episodeViews.render(model.state.episodes);
    selectEpisodeView.render(model.state.episodes);
  } catch (err) {
    console.error(err);
  }
};

//function which is going to control chosen show and render it on web plus change the possible episodes to choose
// !TODO I have refactor this to add events to the option in select menu and add event to it
const controlSelectedShowResults = function () {
  //returning value of parent element from the selectShowView
  const query = +selectEpisodeView.getQuery();

  if (query === 0) {
    episodesView.render(model.state.episodes);
    return;
  }

  model.findSelectedEpisode(query);
  episodeViews.render(model.state.selection.episodes.selected);
};

const controlSearchResult = function () {
  // 1 search query
  const query = searchView.getQuery();

  if (query === "") {
    showsView.render(model.state.shows);
    model.state.search.results = [];
    return;
  }

  if (!query) return;
  model.searchResults(query);

  //2 search and rendering search results
  showsView.render(model.state.search.results);

  model.state.search.results = [];
};

//init function which is going to lunch all needed function following the MVC and Observer patter
const init = function () {
  // there is need to reconsider the way how to join each part of the code
  //because the page is loading two times from search results and window load event
  controlLoadingPageDefault();
  searchView.addHandlerSearch(controlSearchResult);
  selectShowView.addHandlerEpisode(controlSelectedResults);
  selectEpisodeView.addHandlerEpisode(controlSelectedShowResults);

  //development
  paginationView.addHandlerPagination(controlPagePagination);
};

init();
