//!TODO There is need to change the name of this class because this one is related to the select menu for select__input dedicated
// for the episodes of the chosen tv show

class SelectEpisodeView {
  _data;
  _parentElement = document.querySelector(".select__episode__input");

  render(data) {
    if (data === undefined) {
      this._clear();
      return;
    }
    this._data = data;
    const markup = [...this._generateMarkup()].join("");
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerEpisode(handler) {
    this._parentElement.addEventListener("change", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = +this._parentElement.value;
    return query;
  }

  _generateMarkup() {
    const markup = [
      `
        <option value="0" selected> 
          Select Episode
      </option> `,
    ];
    const episodes = this._data;
    episodes.forEach((item) => {
      markup.push(
        `<option value="${item.id}"> S${item.season
          .toString()
          .padStart(2, 0)}E${item.number.toString().padStart(2, 0)} ${
          item.name
        }</option>`
      );
    });
    return markup.join("");
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new SelectEpisodeView();
