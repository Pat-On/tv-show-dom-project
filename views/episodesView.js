// Description: This class is responsible for rendering all episodes in present form on the main page.

class EpisodesView {
  _data;
  _parentElement = document.querySelector(".container");

  //render function which taking the fetched data end render the episodes
  render(data) {
    // temporary solution -> if data is not array put it inside the array!
    // if (data === undefined) {
    //   this._clear();
    //   return;
    // }
    this._data = Array.isArray(data) ? data : [data];

    // rendering the episodes on the main page

    const markup = this._generateMarkup().join("");

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //added event handler (load) which is triggering the "first" load of data
  addHandlerEpisode(handler) {
    window.addEventListener("load", function (e) {
      e.preventDefault();
      handler();
    });
  }

  // function which is generating the necessary markup needed to be add to html
  _generateMarkup() {
    const markup = [];
    const episodes = this._data;
    episodes.forEach((item) => {
      markup.push(`
                  <div class="episode">
                      <h2>${item.name} - S${item.season
        .toString()
        .padStart(2, 0)}E${item.number.toString().padStart(2, 0)}</h2>
                      <img src="${item.image?.medium}" alt="">
                      <p>${item.summary}<p>
                  </div>
                  `);
    });
    return markup;
  }

  // this function is clearing the parent element in that case it is the container element
  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new EpisodesView();
