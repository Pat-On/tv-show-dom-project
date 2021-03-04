//Description: This class is responsible for rendering the number of all episodes and number of the search results

class NumberOfEpisodesView {
  _searchedNumber;
  _totalNumber;
  _data;
  _parentElement = document.querySelector(".number__of__episodes");

  //method is rendering the numbers in html
  render(searched, total) {
    if (searched === undefined || total === undefined) {
      this._clear();
      return;
    }
    this._searchedNumber = searched;
    this._totalNumber = total;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `Displaying ${this._searchedNumber.length}/${this._totalNumber.length} episodes`;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new NumberOfEpisodesView();
