var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Event, Element } from '@stencil/core';
let AppMultiSelect = class AppMultiSelect {
    constructor() {
        this.selectedItems = [];
        this.options = [];
        this.createSelected = (cat) => (h("li", { class: "category-item" }, cat));
        this.creatOptions = (cat) => (h("option", { value: cat }, cat));
        this.handleInput = (evt) => {
            var target = RegExp(evt.target.value, 'i');
            this.filterOptions.emit({ data: target, id: this.el.id });
        };
        this.handleDelete = (evt) => {
            var key = evt.keyCode || evt.charCode;
            var textInput = this.el.shadowRoot.querySelector(".text-input");
            if ((key == 8 || key == 46) && textInput.value == "")
                this.deleteSelect.emit({ data: this.selectedItems.length - 1, id: this.el.id });
        };
        this.handleSelection = (evt) => {
            // fired twice?
            var target = evt.target.value;
            var indx = this.selectedItems.indexOf(target);
            if (indx < 0) {
                this.newSelect.emit({ data: target, id: this.el.id });
            }
            else {
                this.deleteSelect.emit({ data: indx, id: this.el.id });
            }
            var selectElement = this.el.shadowRoot.querySelector(".multi-select-option");
            selectElement.value = "";
        };
        this.handleClick = () => {
            if (!this.show) {
                this.inputFocus.emit({ id: this.el.id });
            }
        };
    }
    componentDidUpdate() {
        if (this.focusInput) {
            var textInput = this.el.shadowRoot.querySelector(".text-input");
            textInput.focus();
        }
    }
    render() {
        return (h("div", { class: "multi-select" },
            h("ul", { onClick: this.handleClick },
                this.selectedItems.map(this.createSelected),
                h("li", null,
                    h("input", { class: "text-input", type: "text", onInput: this.handleInput, onKeyDown: this.handleDelete }))),
            h("select", { class: `multi-select-option ${this.show ? 'showdropdonw' : ''}`, size: this.optionsLength, onInput: this.handleSelection }, this.options.map(this.creatOptions))));
    }
};
__decorate([
    Element()
], AppMultiSelect.prototype, "el", void 0);
__decorate([
    Prop()
], AppMultiSelect.prototype, "selectedItems", void 0);
__decorate([
    Prop()
], AppMultiSelect.prototype, "options", void 0);
__decorate([
    Prop()
], AppMultiSelect.prototype, "optionsLength", void 0);
__decorate([
    Prop()
], AppMultiSelect.prototype, "show", void 0);
__decorate([
    Prop()
], AppMultiSelect.prototype, "focusInput", void 0);
__decorate([
    Event()
], AppMultiSelect.prototype, "newSelect", void 0);
__decorate([
    Event()
], AppMultiSelect.prototype, "deleteSelect", void 0);
__decorate([
    Event()
], AppMultiSelect.prototype, "filterOptions", void 0);
__decorate([
    Event()
], AppMultiSelect.prototype, "inputFocus", void 0);
AppMultiSelect = __decorate([
    Component({
        tag: 'app-multi-select',
        styleUrl: 'app-multi-select.css',
        shadow: true
    })
], AppMultiSelect);
export { AppMultiSelect };
