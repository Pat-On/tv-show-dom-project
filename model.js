import { getOneShow, getAllShows } from "./fakeApi/shows.js";
import { async } from "regenerator-runtime";

//importing fake episodes
import { getOneEpisode, getAllEpisodes } from "./fakeApi/episodes.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

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

//import from the real API
export const importAllEpisodes = async function () {
  try {
    // const res = await fetch("https://api.tvmaze.com/shows/82/episodes")
    const res = await fetch("https://api.tvmaze.com/shows?page=0");
    const data = await res.json();
    console.log(data); //it is working
    state.episodes = data.map((item) => item);
    console.log(state.episodes);

    if (!res.ok) throw new Error(`I'm coming from importAllShows${res.status}`);
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

export const searchResults = function (query) {
  state.search.query = query;
  const data = state.episodes;

  state.search.results = data.filter((episode) => {
    if (
      episode.summary.toLowerCase().includes(query.toLowerCase()) ||
      episode.name.toLowerCase().includes(query.toLowerCase())
    )
      return episode;
  });
  console.log(state.search.results);
};

export const findSelectedEpisode = function (selected) {
  state.selection.selected = selected;
  const data = state.episodes;

  state.selection.selected = data.find((item) => item.id === selected);
};

// const init = function () {
//     importAllShows();
//     ImportOneShow();
//     importAllEpisodes();
//     ImportOneEpisode();
// }

// init();
