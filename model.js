import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import "core-js/stable";

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
};

//import from the real API Temporary it is only set up to page=0
// !TODO later on I need to implement the logic which is going to fetch more pages dependent from the user request
// and divide the data 240 episodes for 60 or 30 on page?
export const importAllEpisodes = async function () {
  try {
    const res = await fetch("https://api.tvmaze.com/shows?page=0");
    const data = await res.json();
    console.log("Fetching model - importAllEpisodes");
    //!TODO modify it in the way that is going to fetch the pages what we are going to provide to the function
    state.shows = data.map((item) => item);

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

const API_PER_PAGE = 100;

// if we're this close to the end of the list, get the next page
const THRESHOLD_PRE_FETCH = 200;

async function selectPage(pageNumber, itemsPerPage) {
  //calculating the index of the object rendered on the page -
  const startIndex = (pageNumber - 1) * itemsPerPage; // 0 * 40 = index 0
  const endIndex = pageNumber * itemsPerPage; //1 * 40 = 40 index

  //checking which episode is going to be fetched base on endIndex and API_PER_PAGE
  if (endIndex > _allShows.length) {
    console.log("fetch");
    //!TODO FIX FETCH
    await fecthPage(Math.floor(endIndex / API_PER_PAGE));
  }

  //lenghts of the all fetched shows compare to the end index from the page plus
  if (endIndex + THRESHOLD_PRE_FETCH > _allShows.length) {
    console.log("pre-fetching");
    // plus one because we need new page not what we haqve on page
    //!TODO FIX FETCH
    fecthPage(Math.floor(endIndex / API_PER_PAGE) + 1);
  }

  return _allShows.slice(startIndex, endIndex);
}
