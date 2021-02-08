
class SelectInputView {
    _data;
    _parentElement = document.querySelector(".select__input");

    render(data) {
        this._data = data;
        console.log(data)
        const markup = this._generateMarkup();
        console.log(markup)
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    // addHandlerEpisode(handler) {
    //     this._parentElement.addEventListener('click', function (e) {
    //         handler();
    //     })
    // }

    _generateMarkup() {
        const markup = [];
        const episodes = this._data;
        episodes.forEach(item => {
            markup.push(`

                    <option value=
                    ${item.id}">${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)} - ${item.name}</option>
                        
                    `)
        })
        return markup;
    };


    _clear() {
        this._parentElement.innerHTML = "";
    }
};

export default new SelectInputView();