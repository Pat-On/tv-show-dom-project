//!TODO There is need to change the name of this class because this one is related to the select menu for select__input dedicated
// for the episodes of the chosen tv show

class PaginationView {
  _dataStartPaginationNumber;
  _dataEndPaginationNumber;
  _parentElementTOP = document.querySelector(".nav_ul--top");
  _parentElementBOTTOM = document.querySelector(".nav_ul--bottom");

  render(start, end) {
    this._dataStartPaginationNumber = start;
    this._dataEndPaginationNumber = end;
    const markup = [...this._generateMarkup()].join("");
    this._clear();
    this._parentElementTOP.insertAdjacentHTML("afterbegin", markup);
    this._parentElementBOTTOM.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerPagination(handler) {
    this._parentElementTOP.addEventListener("click", async function (e) {
      e.preventDefault();
      handler(e.target.innerText);
    });
    //aaa right even propagation! Smarty me XD
    this._parentElementBOTTOM.addEventListener("click", async function (e) {
      e.preventDefault();
      handler(e.target.innerText);
    });
  }

  // //!TODO: think over this, how I want to handle that I implemented double pagination is that have sense? or is better to put one on the bottom?
  // getQuery() {
  //   const query = +this._parentElement.value;
  //   return query;
  // }

  _generateMarkup() {
    const markup = [
      `
        <li>
            <a class="page-link" href="#"><<</a>
        </li>
        `,
    ];

    for (
      let index = this._dataStartPaginationNumber;
      index <= this._dataEndPaginationNumber;
      index++
    ) {
      markup.push(
        `
        <li>
            <a class="page-link" href="#">${index}</a>
        </li>
        `
      );
    }

    markup.push(
      `
        <li>
            <a class="page-link" href="#">>></a>
        </li>
        `
    );
    return markup.join("");
  }

  _clear() {
    this._parentElementTOP.innerHTML = "";
    this._parentElementBOTTOM.innerHTML = "";
  }
}

export default new PaginationView();
