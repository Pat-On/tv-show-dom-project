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
    this._parentElementTOP.addEventListener("click", function (e) {
      e.preventDefault();
      //I'm going to pass to handler the value of inner text, what is easier solution than creating to getQuery
      //!think over it
      handler(e.target.innerText);
    });
    this._parentElementBOTTOM.addEventListener("click", function (e) {
      e.preventDefault();
      handler(e.target.innerText);
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
        <li>
            <a class="page-link" href="#"><<</a>
        </li>
        `,
    ];
    const pagination = this._data;

    pagination.forEach((item) => {
      markup.push(
        `
        <li>
            <a class="page-link" href="#">${item}</a>
        </li>
        `
      );
    });

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
