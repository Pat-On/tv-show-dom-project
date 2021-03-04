import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import "core-js/stable";

import {
  NAV_PAGES_LIMIT,
  ITEMS_PER_PAGE,
  API_PER_PAGE,
  THRESHOLD_PRE_FETCH,
} from "./config.js";

//State variable which is controlling the state of the program
export const state = {
  episodes: [],
  episode: {},
  //!NOTE: I can use these shows as a accumulator for the pagination
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
    lastPage: NAV_PAGES_LIMIT,
    pageToFetchToAPI: 1,
  },
};

//import from the real API Temporary it is only set up to page=0
// !TODO later on I need to implement the logic which is going to fetch more pages dependent from the user request
// and divide the data 240 episodes for 60 or 30 on page?
export const importAllEpisodes = async function (apiPageNumber) {
  try {
    //teorteticly it should work
    const res = await fetch(
      `https://api.tvmaze.com/shows?page=${apiPageNumber}`
    );
    const data = await res.json();
    console.log("Fetching model - importAllEpisodes");
    //!TODO modify it in the way that is going to fetch the pages what we are going to provide to the function
    //code changed for push not to all the time overwritting array
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
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
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
export const searchResults = function (query) {
  state.search.query = query;
  const data = state.shows;

  state.search.results = data.filter((episode) => {
    if (
      episode.summary.toLowerCase().includes(query.toLowerCase()) ||
      episode.name.toLowerCase().includes(query.toLowerCase())
    )
      return episode;
  });
};

//!TODO refactor this to function in one

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

//function responsible for controlling the pagination
//!IMPORTANT - Adam's work! Beautiful!
//!TODO what is going to left, has to go to config

// let _firstPage = 1;
// let _lastPage = NAV_PAGES_LIMIT;

// calculating and selecting the page plus number episodes on it plus fetch
export async function selectPage(pageNumber, itemsPerPage) {
  //api page to state variable (obj)
  state.pagination.pageToFetchToAPI = pageNumber;
  //calculating the index of the object rendered on the page -
  const startIndex = (pageNumber - 1) * itemsPerPage; // 0 * 40 = index 0
  const endIndex = pageNumber * itemsPerPage; //1 * 40 = 40 index

  //checking which episode is going to be fetched base on endIndex and API_PER_PAGE
  if (endIndex > state.shows.length) {
    console.log("fetch");
    //!TODO FIX FETCH
    await importAllEpisodes(Math.floor(endIndex / API_PER_PAGE));
  }

  //lengths of the all fetched shows compare to the end index from the page plus
  if (endIndex + THRESHOLD_PRE_FETCH > state.shows.length) {
    console.log("pre-fetching");
    // plus one because we need new page not what we have on page
    //!TODO FIX FETCH
    await importAllEpisodes(Math.floor(endIndex / API_PER_PAGE) + 1);
  }

  return state.shows.slice(startIndex, endIndex);
}

//function which is calculating the number of the page from the number of episodes on page

//helper function with their variables!IMPORTANT

//jump function << 1 2 3 4 5 >>
export function getNextOrPrevPage(linkText) {
  if (linkText === "<<" && state.pagination.firstPage !== 1) {
    console.log(state.pagination.firstPage);
    state.pagination.lastPage = state.pagination.firstPage - 1;
    const firstPage = state.pagination.firstPage - NAV_PAGES_LIMIT;
    console.log(firstPage);
    state.pagination.firstPage = firstPage < 1 ? 1 : firstPage;
    console.log(firstPage);
    console.log(state.pagination.firstPage);
    return state.pagination.firstPage;
  }

  if (linkText === ">>") {
    state.pagination.firstPage = state.pagination.lastPage + 1;
    state.pagination.lastPage =
      state.pagination.firstPage + NAV_PAGES_LIMIT - 1;
    return state.pagination.firstPage;
  }
}

// export function createPaginationListItem(pageNum) {}
