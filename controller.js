import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model.js";
import episodeViews from "./views/episodesView.js";
import showsView from "./views/showsView.js";
import numberOfEpisodesView from "./views/numberOfEpisodesView.js";
import selectEpisodeView from "./views/selectEpisodeView.js";
import selectShowView from "./views/selectShowView.js";
import searchViewShows from "./views/searchViewShows.js";
import searchViewEpisodes from "./views/searchViewEpisodes.js";

import episodesView from "./views/episodesView.js";

import paginationView from "./views/paginationView.js";
import navigationButtons from "./views/navigationButtons.js";

import * as helpers from "./helpers.js";

const controlPagePagination = async function (valueFromEvent) {
  try {
    const query = valueFromEvent;
    model.getNextOrPrevPage(query);
    console.log(query);
    const pageShows = await model.selectPage(model.state.pagination.firstPage);

    console.log(pageShows.length);
    paginationView.render(
      model.state.pagination.firstPage,
      model.state.pagination.lastPage
    );

    //!TODO it need to be put into the MODEL - LOGIC ALWAYS TO MODEL
    //!BUG "<<" is going to try fetch til error and repeat and repeat
    if (query === ">>" || query === "<<") {
      console.log(model.state.pagination.firstPage);
      const shows = await model.selectPage(model.state.pagination.firstPage);
      showsView.render(shows);
      selectShowView.render(shows);
    }
    if (!isNaN(query)) {
      const shows = await model.selectPage(query);
      showsView.render(shows);
      selectShowView.render(shows);
    }
  } catch (err) {
    console.error(err);
  }
};

//ASYNC FUNCTION
const controlLoadingPageDefault = async function () {
  try {
    //importing all episodes from API
    const pageShows = await model.selectPage(
      model.state.pagination.pageToFetchToAPI
    );
    console.log(pageShows.length);
    paginationView.render(
      model.state.pagination.firstPage,
      model.state.pagination.lastPage
    );

    selectShowView.render(pageShows);
    showsView.render(pageShows);
    selectEpisodeView.render(model.state.episodes);
    selectEpisodeView.hideElement();

    navigationButtons.render();
    navigationButtons.hideElement();
  } catch (err) {
    console.error(err);
  }
};

//ASYNC FUNCTION
const controlSelectedShow = async function () {
  try {
    const query = selectShowView.getQuery();
    await model.importEpisodesOfChosenShow(query);

    //!IMPORTANT is this if statement following the MVC pattern? or it need to be added to model?
    if (query === 0) {
      selectEpisodeView.render();
      numberOfEpisodesView.render();
      selectEpisodeView.hideElement();
      paginationView.render(
        model.state.pagination.firstPage,
        model.state.pagination.lastPage
      );
      selectShowView.render(model.state.pagination.currentShowSlice);
      showsView.render(model.state.pagination.currentShowSlice);

      return;
    }
    searchViewEpisodes.showElement();
    navigationButtons.showElement();
    paginationView.render();
    numberOfEpisodesView.render(model.state.episodes, model.state.episodes);
    model.findSelectedShow(query);
    episodeViews.render(model.state.episodes);
    selectEpisodeView.showElement();
    //TODO: After seasonView is ready do proper print of episodes
    selectEpisodeView.render(model.state.episodes);
  } catch (err) {
    console.error(err);
  }
};

//function which is going to control chosen show and render it on web plus change the possible episodes to choose
// !TODO I have refactor this to add events to the option in select menu and add event to it
const controlSelectedEpisode = function () {
  //returning value of parent element from the selectShowView
  const query = +selectEpisodeView.getQuery();

  if (query === 0) {
    episodesView.render(model.state.episodes);
    return;
  }

  model.findSelectedEpisode(query);
  episodeViews.render(model.state.selection.episodes.selected);
};

const controlSearchResult = async function () {
  try {
    // 1 search query
    const query = searchViewShows.getQuery();

    if (query === "") {
      showsView.render(model.state.shows);
      model.state.search.results = [];
      return;
    }

    if (!query) return;
    await model.searchResults(query);

    //2 search and rendering search results
    console.log(model.state.search.results);
    showsView.render(model.state.search.results);
    paginationView.render();
    selectShowView.render(model.state.search.results);
    model.state.search.results = [];
  } catch (err) {
    console.error(err);
  }
};

const controlSearchResultOfEpisodes = function () {
  const query = searchViewEpisodes.getQuery();
  console.log(query);
  if (query === "") {
    navigationButtons.showElement();
    paginationView.render();
    numberOfEpisodesView.render(model.state.episodes, model.state.episodes);
    model.findSelectedShow(query);
    episodeViews.render(model.state.episodes);
    selectEpisodeView.showElement();
    //TODO: After seasonView is ready do proper print of episodes
    selectEpisodeView.render(model.state.episodes);
  }
  model.searchResultsEpisodesOffline(query);
  console.log(model.state.search.results);
  // return;
  searchViewEpisodes.showElement();
  navigationButtons.showElement();
  paginationView.render();
  numberOfEpisodesView.render(model.state.search.results, model.state.episodes);
  // model.findSelectedShow(query);
  episodeViews.render(model.state.search.results);
  selectEpisodeView.showElement();
  //TODO: After seasonView is ready do proper print of episodes
  selectEpisodeView.render(model.state.search.results);
};

const clickedShows = async function (e) {
  try {
    if (!e.target.dataset.value) return;
    const query = e.target.dataset.value;
    await model.importEpisodesOfChosenShow(query);

    navigationButtons.showElement();
    paginationView.render();
    numberOfEpisodesView.render(model.state.episodes, model.state.episodes);
    model.findSelectedShow(query);
    episodeViews.render(model.state.episodes);
    selectEpisodeView.showElement();
    //TODO: After seasonView is ready do proper print of episodes
    selectEpisodeView.render(model.state.episodes);
  } catch (err) {
    console.error(err);
  }
};

const returnButtonEpisodesPage = function () {
  navigationButtons.hideElement();
  selectEpisodeView.render();
  numberOfEpisodesView.render();
  selectEpisodeView.hideElement();
  paginationView.render(
    model.state.pagination.firstPage,
    model.state.pagination.lastPage
  );
  selectShowView.render(model.state.pagination.currentShowSlice);
  showsView.render(model.state.pagination.currentShowSlice);
};

//init function which is going to lunch all needed function following the MVC and Observer patter
const init = function () {
  // there is need to reconsider the way how to join each part of the code
  //because the page is loading two times from search results and window load event
  controlLoadingPageDefault();
  searchViewShows.addHandlerSearch(helpers.debounce(controlSearchResult, 1000)); //!BUG - not to fix because functionality has to be changes
  searchViewEpisodes.addHandlerSearchEpisodes(controlSearchResultOfEpisodes);

  selectShowView.addHandlerShows(controlSelectedShow);
  selectEpisodeView.addHandlerEpisode(controlSelectedEpisode);

  //development
  paginationView.addHandlerPagination(controlPagePagination);
  showsView.addHandlerEpisode(clickedShows);
  navigationButtons.addHandlerReturnButton(returnButtonEpisodesPage);
};

init();
// I really like how you have identified and commented where you think the bugs are... which in turn will help you to resolve them later down the line.
