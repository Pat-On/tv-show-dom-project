// Description: This class is responsible for rendering all episodes in present form on the main page.

class ShowsView {
  _data;
  _parentElement = document.querySelector(".container");
  // _query;

  //render function which taking the fetched data end render the episodes
  render(data) {
    // temporary solution -> if data is not array put it inside the array!
    this._data = Array.isArray(data) ? data : [data];
    // this._data = data;
    console.log("?");
    // rendering the episodes on the main page

    // console.log(data);
    const markup = this._generateMarkup().join("");
    // console.log(markup);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //added event handler (load) which is triggering the "first" load of data
  addHandlerEpisode(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // if (e.target.value) {
      e.preventDefault();
      handler(e);
      // }
    });
  }

  // function which is generating the necessary markup needed to be add to html
  _generateMarkup() {
    const markup = [];
    const shows = this._data;
    console.log(shows);
    shows.forEach((item) => {
      // markup.push(`
      //             <div class="episode">
      //                 <h2>${item.name} - S${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)}</h2>
      //                 <img src="${item.image.medium}" alt="">
      //                 ${item.summary}
      //                 <a href=${item.url}>Check the source</a>
      //             </div>
      //             `)
      markup.push(`
          <h2 data-value=${item.id}>${item.name}</h2>
          <img src="${item.image?.medium}" alt="">
          ${item.summary}
          <p>Rated: ${item.rating?.average}</p>
          <p>Genres: ${item?.genres?.join(" | ")}</p>
          <p>Runtime: ${item.runtime} minutes</p>
          <a href=${item.url}>Check the source</a>
          </div>
          <div class="episode">
                 `);
    });
    return markup;
  }

  // this function is clearing the parent element in that case it is the container element
  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new ShowsView();
