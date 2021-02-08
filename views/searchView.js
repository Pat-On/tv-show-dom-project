

//!IMPORTANT HOW TO DO ONE MORE SEARCH ON EMPTY
class SearchView {
    _data;
    _parentElement = document.querySelector(".search");


    // I need to make this part of code work:
    // getting query from
    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        // this._clearInput();
        return query;
    }
    //publisher
    addHandlerSearch(handler) {
        console.log(this._parentElement)
        this._parentElement.addEventListener('input', function (e) {
            e.preventDefault();
            handler();
        });
    }
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }

    _clear() {
        this._parentElement.innerHTML = "";
    }


    // render(data) {
    //     this._data = data;
    //     const markup = this._generateMarkup();

    //     this._clear();
    //     this._parentElement.insertAdjacentHTML('afterbegin', markup)

    // }

    // _generateMarkup() {
    //     const markup = [];
    //     const episodes = this._data;
    //     episodes.forEach(item => {
    //         markup.push(`
    //                     <div class="episode">
    //                         <h2>${item.name} - S${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)}</h2>
    //                         <img src="${item.image.medium}" alt="">
    //                         ${item.summary}
    //                         <a href=${item.url}>Check the source</a>
    //                     </div>`)
    //     })
    //     return markup;
    // };



};

export default new SearchView();