import { getOneShow, getAllShows } from "./fakeApi/shows.js"
import { getOneEpisode, getAllEpisodes } from "./fakeApi/episodes.js"

export const state = {
    episodes: [],
    episode: {},
    shows: [],
    show: {},
};



//importing Shows and Episodes
const importAllShows = function () {
    state.shows = getAllShows();
};

const ImportOneShow = function () {
    state.show = getOneShow();
};

const importAllEpisodes = function () {
    state.episodes = getAllEpisodes();
};

const ImportOneEpisode = function () {
    state.episode = getOneEpisode();
};

const init = function () {
    importAllShows();
    ImportOneShow();
    importAllEpisodes();
    ImportOneEpisode();
}

init();