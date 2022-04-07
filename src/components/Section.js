export class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderInitialElements(items) {
        this._items = items;
        this._items.forEach((item) => {
            this.addItem(item);
        })
    }

    addItem(element) {
        const card = this._renderer(element)
        this._container.prepend(card);
    }
}