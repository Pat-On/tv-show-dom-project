// Description: class SearchView is responsible for a search bar

class SearchView {
  _data;
  _parentElement = document.querySelector(".search");

  // I need to make this part of code work:
  // getting query from
  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    return query;
  }
  //publisher
  addHandlerSearch(handler) {
    // console.log(this._parentElement);
    this._parentElement.addEventListener("input", function (e) {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new SearchView();
