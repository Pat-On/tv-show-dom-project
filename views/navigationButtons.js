// Description: This class is responsible for rendering all episodes in present form on the main page.

class navigationButtons {
  _data;
  _parentElement = document.querySelector(".root__button");
  // _query;

  //render function which taking the fetched data end render the episodes
  render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //added event handler (load) which is triggering the "first" load of data
  addHandlerReturnButton(handler) {
    this._parentElement.addEventListener("click", function (e) {
      // if (e.target.value) {
      e.preventDefault();
      handler(e);
      // }
    });
  }

  // function which is generating the necessary markup needed to be add to html
  _generateMarkup() {
    const markup = `<button type="button">RETURN</button>`;

    return markup;
  }

  // this function is clearing the parent element in that case it is the container element
  _clear() {
    this._parentElement.innerHTML = "";
  }

  hideElement() {
    this._parentElement.classList.add("hiddenClass");
  }

  showElement() {
    this._parentElement.classList.remove("hiddenClass");
  }
}

export default new navigationButtons();
