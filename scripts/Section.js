export class Section {
    constructor({items, renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
        this._items = items;
    }

    renderInitialElements() {
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }

}