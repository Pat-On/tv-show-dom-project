//!TODO There is need to change the name of this class because this one is related to the select menu for select__input dedicated
// for the episodes of the chosen tv show

class PaginationView {
  _data;
  _parentElementTOP = document.querySelector(".nav_ul--top");
  _parentElementBOTTOM = document.querySelector(".nav_ul--bottom");

  render(data) {
    this._data = data;
    const markup = [...this._generateMarkup()].join("");
    this._clear();
    this._parentElementTOP.insertAdjacentHTML("afterbegin", markup);
    this._parentElementBOTTOM.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("change", function (e) {
      e.preventDefault();
      handler();
    });
  }

  //!TODO: think over this, how I want to handle that I implemented double pagination is that have sense? or is better to put one on the bottom?
  getQuery() {
    const query = +this._parentElement.value;
    return query;
  }

  //!TODO: Markup for pagination
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
    this._parentElementTOP.innerHTML = "";
    this._parentElementBOTTOM.innerHTML = "";
  }
}

export default new PaginationView();
