import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import "core-js/stable";

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
};

//import from the real API Temporary it is only set up to page=0
// !TODO later on I need to implement the logic which is going to fetch more pages dependent from the user request
// and divide the data 240 episodes for 60 or 30 on page?
export const importAllEpisodes = async function () {
  try {
    const res = await fetch("https://api.tvmaze.com/shows?page=0");
    const data = await res.json();
    console.log("Fetching model - importAllEpisodes");

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
