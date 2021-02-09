import { getOneShow, getAllShows } from "./fakeApi/shows.js"
import { getOneEpisode, getAllEpisodes } from "./fakeApi/episodes.js"

export const state = {
    episodes: [],
    episode: {},
    shows: [],
    show: {},
    search: {
        query: '',
        results: [],
    },
    selection: {
        query: "",
        selected: {},
    },
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


export const searchResults = function (query) {
    state.search.query = query;
    const data = state.episodes;

    state.search.results = data.filter(episode => {
        if (episode.summary.toLowerCase().includes(query.toLowerCase())
            || episode.name.toLowerCase().includes(query.toLowerCase()))
            return episode;
    })
    console.log(state.search.results)
}

export const findSelectedEpisode = function (selected) {
    state.selection.selected = selected;
    const data = state.episodes;

    state.selection.selected = data.find(item => item.id === selected)
}



const init = function () {
    importAllShows();
    ImportOneShow();
    importAllEpisodes();
    ImportOneEpisode();
}

init();