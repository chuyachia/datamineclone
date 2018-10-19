var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Listen } from '@stencil/core';
import csv from 'csvtojson';
import getData from '../../util/getData.js';
let AppTable = class AppTable {
    constructor() {
        this.data = [];
        this.sortDir = '';
        this.criteria = null;
        this.selected = [];
        this.curPage = 1;
        this.infoModalOpen = false;
        this.selectModalOpen = false;
        this.infoData = {};
        this.searchTerm = '';
        this.instrumType = [];
        this.category = [];
        this.exchange = [];
        this.curPageData = [];
        this.dataLength = this.data.length;
        this.productLevel = "individual";
        this.updateShowedData = () => {
            var filteredData = this.data;
            if (this.searchTerm.length > 1 || this.instrumType.length > 0 || this.category.length > 0 || this.productLevel !== null) {
                var target = RegExp(this.searchTerm, 'i');
                filteredData = this.data.filter((row) => {
                    var level;
                    var term = target.test(row.product) || target.test(row.symbol);
                    var instrum;
                    var instrumSum = 0;
                    var cat;
                    if (this.productLevel == 'individual') {
                        level = !/Complete/.test(row.product);
                    }
                    else if (this.productLevel == 'complete') {
                        level = /Complete Exchange/.test(row.product);
                    }
                    else if (this.productLevel == 'all') {
                        level = /Complete all/.test(row.product);
                    }
                    this.instrumType.forEach(function (type) {
                        instrumSum += row[type];
                    });
                    if (this.instrumType.length == 0) {
                        instrum = true;
                    }
                    else {
                        if (instrumSum > 0)
                            instrum = true;
                        else
                            instrum = false;
                    }
                    if (this.category.length == 0) {
                        cat = true;
                    }
                    else {
                        cat = this.category.indexOf(row.category) >= 0;
                    }
                    return term && instrum && cat && level;
                });
            }
            if (this.criteria != null) {
                filteredData.sort((a, b) => {
                    if (a[this.criteria] < b[this.criteria]) {
                        return this.sortDir == 'desc' ? -1 : 1;
                    }
                    else if (a[this.criteria] > b[this.criteria]) {
                        return this.sortDir == 'desc' ? 1 : -1;
                    }
                    else {
                        return 0;
                    }
                });
            }
            this.dataLength = filteredData.length;
            this.curPageData = filteredData.slice((this.curPage - 1) * this.nrowPage, this.curPage * this.nrowPage);
        };
        this.handleProductClick = (evt) => {
            var el = evt.srcElement;
            var data = {
                product: el.getAttribute('data-product'),
                exchange: el.getAttribute('data-exchange'),
                category: el.getAttribute('data-category'),
                symbol: el.getAttribute('data-symbol'),
                foi: el.getAttribute('data-foi')
            };
            this.infoModalOpen = true;
            this.infoData = data;
        };
        this.handleSortClick = (evt) => {
            this.criteria = evt.srcElement.getAttribute('data-name');
            this.sortDir = this.sortDir == 'desc' ? 'asc' : 'desc';
            this.updateShowedData();
        };
        this.handleSelect = (evt) => {
            var target = evt.target.value;
            console.log(target);
            var indx = this.selected.indexOf(target);
            if (indx == -1) {
                this.selected = [...this.selected, target];
            }
            else {
                this.selected = this.selected.slice(0, indx).concat(this.selected.slice(indx + 1));
            }
        };
        this.addSelection = () => {
            this.selectModalOpen = true;
        };
        this.clearSelection = () => {
            this.selected = [];
        };
        this.createDataRow = (data) => {
            return (h("tr", null,
                h("td", null,
                    h("input", { type: "checkbox", value: data.product, onChange: this.handleSelect, checked: this.selected.indexOf(data.product) >= 0 })),
                h("td", null,
                    h("a", { href: "#", "data-product": data.product, "data-exchange": data.exchange, "data-category": data.category, "data-symbol": data.symbol, "data-foi": data.foi, onClick: this.handleProductClick }, data.product)),
                h("td", null),
                h("td", null, data.exchange),
                h("td", null, data.category),
                h("td", null, data.symbol),
                h("td", null, data.foi)));
        };
    }
    changePageHandler(event) {
        this.curPage = event.detail;
        this.updateShowedData();
    }
    closeModalHandler(event) {
        if (event.detail == "product-select") {
            this.selectModalOpen = false;
        }
        else if (event.detail == "product-info") {
            this.infoModalOpen = false;
        }
    }
    newSearchHandler(event) {
        this.curPage = 1;
        this.searchTerm = event.detail;
        this.updateShowedData();
    }
    newInstrumTypeHandler(event) {
        var target = event.detail;
        var indx = this.instrumType.indexOf(target);
        if (indx == -1) {
            this.instrumType = [...this.instrumType, target];
        }
        else {
            this.instrumType = this.instrumType.slice(0, indx).concat(this.instrumType.slice(indx + 1));
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    handleNewSelect(event) {
        var data, id;
        ({ data, id } = event.detail);
        if (data == "")
            return;
        if (id == "category") {
            this.category = [...this.category, data];
        }
        else if (event.detail.id == "exchange") {
            this.exchange = [...this.exchange, data];
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    handleNewProducLevel(event) {
        this.productLevel = event.detail;
        this.instrumType = [];
        this.category = [];
        this.exchange = [];
        this.searchTerm = '';
        this.curPage = 1;
        this.updateShowedData();
    }
    handleDeleteSelect(event) {
        var data, id;
        ({ data, id } = event.detail);
        if (id == "category") {
            this.category = this.category.slice(0, data).concat(this.category.slice(data + 1));
        }
        else if (event.detail.id == "exchange") {
            this.exchange = this.exchange.slice(0, data).concat(this.exchange.slice(data + 1));
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    handleResetFilter() {
        this.productLevel = 'individual';
        this.instrumType = [];
        this.category = [];
        this.searchTerm = '';
        this.curPage = 1;
        this.updateShowedData();
    }
    componentWillLoad() {
        getData('https://cdn.glitch.com/1e8c939e-c923-420c-b9e8-e4fed617755f%2Fproductsheet.csv')
            .then((response) => {
            csv({
                delimiter: ';',
                trim: true
            }).fromString(response)
                .then(function (parsed) {
                return parsed.map(function (row) {
                    return {
                        product: row.PROD_NAME,
                        exchange: row.EXCH_CODE,
                        category: row.PROD_CATEGORY,
                        symbol: row.PROD_CODE,
                        foi: row.FOI,
                        spread: row.SPREAD_IND == 1 ? true : false,
                        future: row.FOI == "FUT" ? true : false,
                        option: row.FOI == "OPT" ? true : false
                    };
                }).filter(function (row) {
                    return row.product.length > 0 && row.symbol.length > 0 && row.symbol != 'null';
                });
            }).then((cleaned) => {
                this.data = cleaned;
                this.updateShowedData();
            });
        }).catch(function (error) {
            console.log(error);
        });
        /*this.data = [{
            product:'a',
            exchange:'a',
            category:'AGRICULTURE',
            symbol:'a',
            foi:'a',
            spread:false,
            future:true,
            option:false
        },{
            product:'a',
            exchange:'a',
            category:'ENERGY',
            symbol:'a',
            foi:'a',
            spread:true,
            future:true,
            option:false
        }];
        this.updateShowedData();*/
    }
    render() {
        return (h("main", null,
            h("app-backdrop", { open: this.data.length == 0 },
                h("div", { class: "loaderwrap" },
                    h("p", { class: "loader" }, "Loading"))),
            h("app-control", { class: "app-control", instrumType: this.instrumType, searchTerm: this.searchTerm, selectedCats: this.category, selectedExs: this.exchange, productLevel: this.productLevel }),
            h("section", { class: "app-content" },
                h("div", null,
                    h("app-button", { type: "highlight", onClick: this.addSelection, disabled: this.selected.length == 0 }, "Add Selected and Continue"),
                    h("app-button", { type: "cancel", onClick: this.clearSelection }, "Clear All Selected")),
                h("table", null,
                    h("tr", { class: "table-head" },
                        h("th", null),
                        h("th", null,
                            h("app-arrows", { text: "Product Name", "data-name": "product", selected: this.criteria == "product", direction: this.sortDir, onClick: this.handleSortClick })),
                        h("th", null, "Availability"),
                        h("th", null,
                            h("app-arrows", { text: "Exchange", "data-name": "exchange", selected: this.criteria == "exchange", direction: this.sortDir, onClick: this.handleSortClick })),
                        h("th", null,
                            h("app-arrows", { text: "Category", "data-name": "category", selected: this.criteria == "category", direction: this.sortDir, onClick: this.handleSortClick })),
                        h("th", null,
                            h("app-arrows", { text: "Symbol", "data-name": "symbol", selected: this.criteria == "symbol", direction: this.sortDir, onClick: this.handleSortClick })),
                        h("th", null,
                            h("app-arrows", { text: "FOI", "data-name": "foi", selected: this.criteria == "foi", direction: this.sortDir, onClick: this.handleSortClick }))),
                    this.curPageData.map(this.createDataRow)),
                h("div", null,
                    "Showing ",
                    this.dataLength == 0 ? 0 : (this.curPage - 1) * this.nrowPage + 1,
                    " to ",
                    this.curPage * this.nrowPage < this.dataLength ? this.curPage * this.nrowPage : this.dataLength,
                    " of ",
                    this.dataLength,
                    " entries"),
                h("app-pagination", { class: "pagination", maxSeq: 5, nPage: Math.ceil(this.dataLength / this.nrowPage), curPage: this.curPage })),
            h("app-modal", { id: "product-select", "modal-title": "Product Selection", open: this.selectModalOpen, confirmButton: true, confirmButtonText: "Add to Cart" },
                h("p", null,
                    "You have selected ",
                    this.selected.length,
                    " product(s)."),
                h("p", null, "Please choose the data type and range. They will be applied to all selected products.")),
            h("app-modal", { id: "product-info", "modal-title": "Product Information", open: this.infoModalOpen, confirmButton: false },
                h("app-info-table", { data: this.infoData }))));
    }
};
__decorate([
    Prop()
], AppTable.prototype, "nrowPage", void 0);
__decorate([
    State()
], AppTable.prototype, "data", void 0);
__decorate([
    State()
], AppTable.prototype, "sortDir", void 0);
__decorate([
    State()
], AppTable.prototype, "criteria", void 0);
__decorate([
    State()
], AppTable.prototype, "selected", void 0);
__decorate([
    State()
], AppTable.prototype, "curPage", void 0);
__decorate([
    State()
], AppTable.prototype, "infoModalOpen", void 0);
__decorate([
    State()
], AppTable.prototype, "selectModalOpen", void 0);
__decorate([
    State()
], AppTable.prototype, "infoData", void 0);
__decorate([
    State()
], AppTable.prototype, "searchTerm", void 0);
__decorate([
    State()
], AppTable.prototype, "instrumType", void 0);
__decorate([
    State()
], AppTable.prototype, "category", void 0);
__decorate([
    State()
], AppTable.prototype, "exchange", void 0);
__decorate([
    State()
], AppTable.prototype, "curPageData", void 0);
__decorate([
    State()
], AppTable.prototype, "dataLength", void 0);
__decorate([
    State()
], AppTable.prototype, "productLevel", void 0);
__decorate([
    Listen('changePage')
], AppTable.prototype, "changePageHandler", null);
__decorate([
    Listen('closeModal')
], AppTable.prototype, "closeModalHandler", null);
__decorate([
    Listen('newSearch')
], AppTable.prototype, "newSearchHandler", null);
__decorate([
    Listen('newInstrumType')
], AppTable.prototype, "newInstrumTypeHandler", null);
__decorate([
    Listen('newSelect')
], AppTable.prototype, "handleNewSelect", null);
__decorate([
    Listen('newProductLevel')
], AppTable.prototype, "handleNewProducLevel", null);
__decorate([
    Listen('deleteSelect')
], AppTable.prototype, "handleDeleteSelect", null);
__decorate([
    Listen('resetFilter')
], AppTable.prototype, "handleResetFilter", null);
AppTable = __decorate([
    Component({
        tag: 'app-main',
        styleUrl: 'app-main.css',
        shadow: true
    })
], AppTable);
export { AppTable };
