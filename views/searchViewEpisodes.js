// Description: class SearchView is responsible for a search bar

class searchViewShows {
  _data;
  _parentElement = document.querySelector(".search--episodes");

  // I need to make this part of code work:
  // getting query from
  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    return query;
  }
  //publisher
  addHandlerSearchEpisodes(handler) {
    // console.log(this._parentElement);
    this._parentElement.addEventListener("input", function (e) {
      e.preventDefault();
      handler();
    });
  }

  hideElement() {
    this._parentElement.classList.add("hiddenClass");
  }

  showElement() {
    this._parentElement.classList.remove("hiddenClass");
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new searchViewShows();
