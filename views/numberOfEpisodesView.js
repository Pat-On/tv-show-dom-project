
class NumberOfEpisodesView {
    _searchedNumber;
    _totalNumber;
    _data;
    _parentElement = document.querySelector(".number__of__episodes");

    render(searched, total) {
        this._searchedNumber = searched;
        this._totalNumber = total;
        const markup = this._generateMarkup();

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup)

    }

    _generateMarkup() {
        // console.log(searched)
        return `Displaying ${this._searchedNumber.length}/${this._totalNumber.length}`;
    };


    _clear() {
        this._parentElement.innerHTML = "";
    }
};

export default new NumberOfEpisodesView();