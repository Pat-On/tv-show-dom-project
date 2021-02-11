
class SelectShowView {
    _data;
    _parentElement = document.querySelector(".select__show__input");

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    };

    addHandlerEpisode(handler) {
        this._parentElement.addEventListener('change', function (e) {
            e.preventDefault();
            handler();
        })
    }

    getQuery() {
        const query = +this._parentElement.value;
        // this._clearInput();
        return query;
    }


    _generateMarkup() {
        const markup = [`
        <option value="0" selected> 
          Select all episodes
      </option> `
        ];
        const episodes = this._data;
        episodes.forEach(item => {
            markup.push(`<option value="${item.id}">$E$ - ${item.name}</option>`)
        })
        return markup;
    };


    _clear() {
        this._parentElement.innerHTML = "";
    }
};

export default new SelectShowView();