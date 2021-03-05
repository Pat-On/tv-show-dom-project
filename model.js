import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import "core-js/stable";
import * as helpers from "./helpers";

import * as config from "./config.js";

//State variable which is controlling the state of the program
export const state = {
  episodes: [],
  episode: {},
  shows: [],
  show: {},
  search: {
    query: "",
    results: [],
  },
  selection: {
    shows: {
      query: "",
      selected: {},
    },
    episodes: {
      query: "",
      selected: {},
    },
  },
  pagination: {
    firstPage: 1,
    lastPage: config.NAV_PAGES_LIMIT,
    pageToFetchToAPI: 1,
    itemPerPage: config.ITEMS_PER_PAGE,
    currentShowSlice: [],
  },
};

export const importAllShows = async function (apiPageNumber) {
  try {
    const fetchVariable = fetch(
      `https://api.tvmaze.com/shows?page=${apiPageNumber}`
    );

    const res = await Promise.race([
      fetchVariable,
      helpers.timeout(config.TIME_OUT),
    ]);
    const data = await res.json();
    console.log("Fetching model - importAllEpisodes");
    state.shows.push(...data);

    if (!res.ok) throw new Error(`I'm coming from importAllShows${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

//importing base on ID the episodes of the show
export const importEpisodesOfChosenShow = async function (id) {
  try {
    state.selection.query = id;
    //guard function to the 0 from the id value - id value 0 no exist!
    //this value is used to render shows on the page
    if (id === 0) return;
    const fetchVariable = fetch(`https://api.tvmaze.com/shows/${id}/episodes`);

    const res = await Promise.race([
      fetchVariable,
      helpers.timeout(config.TIME_OUT),
    ]);
    const data = await res.json();
    console.log(data);
    state.episodes = data.map((item) => item);

    if (!res.ok)
      throw new Error(
        `I'm coming from importEpisodesOfChosenShow${res.status}`
      );
    return data;
  } catch (err) {
    throw err;
  }
};

//TODO in next step searchResults() methods is going to be replace by API search option
// search results for the searchView - ".search".
//function is looking for the looking word inside the description of episode (summary) and the (name)
// export const searchResults = function (query) {
//   state.search.query = query;
//   const data = state.shows;

//   state.search.results = data.filter((episode) => {
//     if (
//       episode.summary.toLowerCase().includes(query.toLowerCase()) ||
//       episode.name.toLowerCase().includes(query.toLowerCase())
//     )
//       return episode;
//   });
// };

export const searchResults = async function (query) {
  try {
    state.search.query = query;
    const fetchVariable = fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );

    const res = await Promise.race([
      fetchVariable,
      helpers.timeout(config.TIME_OUT),
    ]);
    const data = await res.json();

    state.search.results = data.map((item) => item.show);

    if (!res.ok) throw new Error(`I'm coming from searchResults${res.status}`);
    return data;
  } catch (err) {}
};

//!TODO refactor these to function in one

//function which is going to be used in select menu. Object is selected by ID of the object
export const findSelectedShow = function (query) {
  state.selection.shows.query = query;
  const data = state.shows;

  state.selection.shows.selected = data.find((item) => item.id === query);
};

//function which is going to be used in select menu - episodes to find selected episode by ID
export const findSelectedEpisode = function (query) {
  state.selection.episodes.query = query;
  const data = state.episodes;

  state.selection.episodes.selected = data.find((item) => item.id === query);
};

//!IMPORTANT - Based on Adam's code

// calculating and selecting the page plus number of shows on it + fetch
export async function selectPage(pageNumber) {
  state.pagination.pageToFetchToAPI = pageNumber;
  //calculating the index of the object rendered on the page -
  const startIndex = (pageNumber - 1) * state.pagination.itemPerPage; // 0 * 40 = index 0
  const endIndex = pageNumber * state.pagination.itemPerPage; //1 * 40 = 40 index

  //checking which shows is going to be fetched base on endIndex and API_PER_PAGE
  if (endIndex > state.shows.length) {
    console.log("fetch");
    //!TODO FIX FETCH
    await importAllShows(Math.floor(endIndex / config.API_PER_PAGE));
  }

  //lengths of the all fetched shows compare to the end index from the page plus 1 to get this one extra
  if (endIndex + config.THRESHOLD_PRE_FETCH > state.shows.length) {
    console.log("pre-fetching");
    // plus one because we need new page not what we have on page
    await importAllShows(Math.floor(endIndex / config.API_PER_PAGE) + 1);
  }

  return (state.pagination.currentShowSlice = state.shows.slice(
    startIndex,
    endIndex
  ));
}

// Function checking if we jumped to next "pagination"
export function getNextOrPrevPage(linkText) {
  if (linkText === "<<" && state.pagination.firstPage !== 1) {
    console.log(state.pagination.firstPage);
    state.pagination.lastPage = state.pagination.firstPage - 1;
    const firstPage = state.pagination.firstPage - config.NAV_PAGES_LIMIT;
    state.pagination.firstPage = firstPage < 1 ? 1 : firstPage;
    return state.pagination.firstPage;
  }

  if (linkText === ">>") {
    state.pagination.firstPage = state.pagination.lastPage + 1;
    state.pagination.lastPage =
      state.pagination.firstPage + config.NAV_PAGES_LIMIT - 1;
    return state.pagination.firstPage;
  }
}
