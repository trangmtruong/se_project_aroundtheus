//handles a section of the page, by taking in 'data', converting it to html, and placing it on the page
export default class Section {
  constructor({ items, renderer }, classSelector) {
    //The items property should be an array of data, which you must add to the page when it loads
    this._items = items;

    //The renderer property should be a function that takes data and converts it to html
    this._renderer = renderer;

    //Its second constructor parameter should be a CSS class selector where you'll add the card elements.
    this._container = document.querySelector(classSelector);
  }

  addItem(data) {
    //takes data, converts it to html, and places it on the page
    const element = this._renderer(data);
    // should be called when adding an individual card to the DOM
    this._container.prepend(element);
  }
  renderItems() {
    //renders all elements on the page.
    //iterates through the items array and call the renderer() function on each item
    //should be called once on page load
    this._items.forEach((data) => {
      this.addItem(data);
    });
  }
}
