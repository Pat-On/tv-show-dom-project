
class SelectInputView {
    _data;
    _parentElement = document.querySelector(".select__input");

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
            markup.push(`<option value="${item.id}">${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)} - ${item.name}</option>`)
        })
        return markup;
    };


    _clear() {
        this._parentElement.innerHTML = "";
    }
};

export default new SelectInputView();