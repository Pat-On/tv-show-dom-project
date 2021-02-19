import { getOneShow, getAllShows } from "./fakeApi/shows.js";
import { async } from "regenerator-runtime";

//importing fake episodes
import { getOneEpisode, getAllEpisodes } from "./fakeApi/episodes.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

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
    query: "",
    selected: {},
  },
};

//import from the real API Temporary it is only set up to page=0
// !TODO later on I need to implement the logic which is going to fetch more pages dependent from the user request
// and divide the data 240 episodes for 60 or 30 on page?
export const importAllEpisodes = async function () {
  try {
    // const res = await fetch("https://api.tvmaze.com/shows/82/episodes")
    const res = await fetch("https://api.tvmaze.com/shows?page=0");
    const data = await res.json();
    //console log checking how many time episodes were wetched
    console.log("Fetching model - importAllEpisodes");
    // console.log(data); //it is working
    state.shows = data.map((item) => item);
    // console.log(state.episodes);

    if (!res.ok) throw new Error(`I'm coming from importAllShows${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

//importing base on ID the episodes of the show
export const importEpisodesOfChosenShow = async function () {
  try {
    const id = state.selection.query;
    console.log(id);
    //guard function to the 0 from the id value - id value 0 no exist!
    //this value is used to render shows on the page
    if (id === 0) return;
    const res = await fetch(`http://api.tvmaze.com/shows/${id}/episodes`);
    const data = await res.json();
    console.log(state);
    state.episodes = data.map((item) => item);
    console.log(state.episodes);
    if (!res.ok)
      throw new Error(
        `I'm coming from importEpisodesOfChosenShow${res.status}`
      );
    return data;
  } catch (err) {
    throw err;
  }
};

//importing Shows and Episodes base on "fake API"
// const importAllShows = function () {
//     state.shows = getAllShows();
// };

// const ImportOneShow = function () {
//     state.show = getOneShow();
// };

// const importAllEpisodes = function () {
//     state.episodes = getAllEpisodes();
// };

// const ImportOneEpisode = function () {
//     state.episode = getOneEpisode();
// };

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
  // console.log(state.search.results);
};

//function which is going to be used in select menu. Object is selected by ID of the object
export const findSelectedEpisode = function (selected) {
  state.selection.selected = selected;
  const data = state.shows;

  state.selection.selected = data.find((item) => item.id === selected);
};

// const init = function () {
//     importAllShows();
//     ImportOneShow();
//     importAllEpisodes();
//     ImportOneEpisode();
// }

// init();
