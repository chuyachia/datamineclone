var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Event, Listen } from '@stencil/core';
let AppControl = class AppControl {
    constructor() {
        this.categoryList = ['AGRICULTURE', 'ENERGY', 'EQUITY INDEX', 'FX', 'INTEREST RATES', 'METALS', 'REAL ESTATE', 'WEATHER'];
        this.exchangeList = ['COMEX', 'CBOT', 'CME'];
        this.showedCats = this.categoryList;
        this.showedExs = this.exchangeList;
        this.showCatOptions = false;
        this.showExOptions = false;
        this.focusCatOptions = false;
        this.focusExOptions = false;
        this.searchTerm = '';
        this.handleSearchInput = (evt) => {
            this.newSearch.emit(evt.target.value);
        };
        this.handleRadio = (evt) => {
            this.newProductLevel.emit(evt.target.value);
        };
        this.handleCheckbox = (evt) => {
            this.newInstrumType.emit(evt.target.value);
        };
        this.handleClick = (evt) => {
            if (evt.target.tagName == "APP-MULTI-SELECT") {
                if (evt.target.id == "category") {
                    this.showCatOptions = this.showCatOptions ? false : true;
                    this.focusCatOptions = true;
                }
                else if (evt.target.id == "exchange") {
                    this.showExOptions = this.showExOptions ? false : true;
                    this.focusExOptions = true;
                }
            }
            else {
                this.showCatOptions = false;
                this.showExOptions = false;
                this.focusCatOptions = false;
                this.focusExOptions = false;
            }
        };
        this.handleReset = () => {
            this.resetFilter.emit();
        };
    }
    handleNewProductLevel() {
        this.showedCats = this.categoryList;
        this.showedExs = this.exchangeList;
    }
    handleFilterOptions(event) {
        if (event.detail.id == "category") {
            this.showedCats = this.categoryList.filter(function (cat) {
                return event.detail.data.test(cat);
            });
            this.showCatOptions = true;
        }
        else if (event.detail.id == "exchange") {
            this.showedExs = this.exchangeList.filter(function (cat) {
                return event.detail.data.test(cat);
            });
            this.showExOptions = true;
        }
    }
    handleInputFocus(event) {
        if (event.detail.id == "category") {
            this.focusCatOptions = true;
        }
        else if (event.detail.id == "exchange") {
            this.focusExOptions = true;
        }
    }
    render() {
        return (h("div", { onClick: this.handleClick, class: "wrap" },
            h("div", null, "Refine Your Search"),
            h("app-button", { onClick: this.handleReset }, "Reset"),
            h("div", { class: "input-wrap" },
                h("input", { class: "text-input", type: "text", maxlength: "150", value: this.searchTerm, onInput: this.handleSearchInput })),
            h("label", null,
                h("input", { type: "radio", name: "products", value: "individual", onInput: this.handleRadio, checked: this.productLevel == "individual" }),
                "Individual products"),
            h("label", null,
                h("input", { type: "radio", name: "products", value: "complete", onInput: this.handleRadio, checked: this.productLevel == "complete" }),
                "Complete individual exchange"),
            h("label", null,
                h("input", { type: "radio", name: "products", value: "all", onInput: this.handleRadio, checked: this.productLevel == "all" }),
                "All exchanges (All data)"),
            this.productLevel == 'individual' && h("div", null,
                h("strong", null, "Instrument Type"),
                h("label", null,
                    h("input", { type: "checkbox", value: "future", onInput: this.handleCheckbox, checked: this.instrumType.indexOf('future') >= 0 }),
                    "Futures"),
                h("label", null,
                    h("input", { type: "checkbox", value: "option", onInput: this.handleCheckbox, checked: this.instrumType.indexOf('option') >= 0 }),
                    "Options"),
                h("label", null,
                    h("input", { type: "checkbox", value: "spread", onInput: this.handleCheckbox, checked: this.instrumType.indexOf('spread') >= 0 }),
                    "Spreads")),
            this.productLevel == 'individual' && h("div", null,
                h("strong", null, "Asset Class"),
                h("app-multi-select", { id: "category", selectedItems: this.selectedCats, show: this.showCatOptions, options: this.showedCats, "options-length": this.categoryList.length, focusInput: this.focusCatOptions })),
            (this.productLevel == "individual" || this.productLevel == "complete") && h("div", null,
                h("strong", null, "Exchange"),
                h("app-multi-select", { id: "exchange", selectedItems: this.selectedExs, show: this.showExOptions, options: this.showedExs, "options-length": this.exchangeList.length, focusInput: this.focusExOptions }))));
    }
};
__decorate([
    State()
], AppControl.prototype, "categoryList", void 0);
__decorate([
    State()
], AppControl.prototype, "exchangeList", void 0);
__decorate([
    State()
], AppControl.prototype, "showedCats", void 0);
__decorate([
    State()
], AppControl.prototype, "showedExs", void 0);
__decorate([
    State()
], AppControl.prototype, "showCatOptions", void 0);
__decorate([
    State()
], AppControl.prototype, "showExOptions", void 0);
__decorate([
    State()
], AppControl.prototype, "focusCatOptions", void 0);
__decorate([
    State()
], AppControl.prototype, "focusExOptions", void 0);
__decorate([
    Prop()
], AppControl.prototype, "searchTerm", void 0);
__decorate([
    Prop()
], AppControl.prototype, "instrumType", void 0);
__decorate([
    Prop()
], AppControl.prototype, "selectedCats", void 0);
__decorate([
    Prop()
], AppControl.prototype, "selectedExs", void 0);
__decorate([
    Prop()
], AppControl.prototype, "productLevel", void 0);
__decorate([
    Event()
], AppControl.prototype, "newProductLevel", void 0);
__decorate([
    Event()
], AppControl.prototype, "newSearch", void 0);
__decorate([
    Event()
], AppControl.prototype, "newInstrumType", void 0);
__decorate([
    Event()
], AppControl.prototype, "resetFilter", void 0);
__decorate([
    Listen('newProductLevel')
], AppControl.prototype, "handleNewProductLevel", null);
__decorate([
    Listen('filterOptions')
], AppControl.prototype, "handleFilterOptions", null);
__decorate([
    Listen('inputFocus')
], AppControl.prototype, "handleInputFocus", null);
AppControl = __decorate([
    Component({
        tag: 'app-control',
        styleUrl: 'app-control.css',
        shadow: true
    })
], AppControl);
export { AppControl };
