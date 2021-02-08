
class EpisodesView {
    _data;
    _parentElement = document.querySelector(".container");

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();

        this._parentElement.insertAdjacentHTML('afterbegin', markup)

    }

    _generateMarkup() {
        const markup = [];
        const episodes = this._data;
        episodes.forEach(item => {
            markup.push(`
                        <div class="episode">
                            <h2>${item.name} - S${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)}</h2>
                            <img src="${item.image.medium}" alt="">
                            ${item.summary}
                            <a href=${item.url}>Check the source</a>
                        </div>`)
        })
        return markup;
    };

};

export default new EpisodesView();