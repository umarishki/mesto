export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
        this._items = items;
    }

    renderInitialElements() {
        this._items.forEach((item) => {
            this.addItem(item);
        })
    }

    addItem(element) {
        const card = this._renderer(element)
        this._container.prepend(card);
    }
}