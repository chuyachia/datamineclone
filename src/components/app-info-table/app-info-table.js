var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
let AppInfoTable = class AppInfoTable {
    render() {
        return (h("table", null,
            h("tr", null,
                h("td", null, "Product"),
                h("td", null, this.data.product)),
            h("tr", null,
                h("td", null, "Dataset"),
                h("td", null, this.data.dataset)),
            h("tr", null,
                h("td", null, "Category"),
                h("td", null, this.data.category)),
            h("tr", null,
                h("td", null, "Group code"),
                h("td", null, this.data.groupcode)),
            h("tr", null,
                h("td", null, "Product code"),
                h("td", null, this.data.productcode)),
            h("tr", null,
                h("td", null, "Exchange"),
                h("td", null, this.data.exchange)),
            h("tr", null,
                h("td", null, "Symbol"),
                h("td", null, this.data.symbol)),
            h("tr", null,
                h("td", null, "FOI"),
                h("td", null, this.data.foi)),
            h("tr", null,
                h("td", null, "Spread"),
                h("td", null, this.data.spread)),
            h("tr", null,
                h("td", null, "Floor traded"),
                h("td", null, this.data.floor)),
            h("tr", null,
                h("td", null, "Globex traded"),
                h("td", null, this.data.globex)),
            h("tr", null,
                h("td", null, "Tier"),
                h("td", null, this.data.tier)),
            h("tr", null,
                h("td", null, "File first seen on"),
                h("td", null, this.data.firstseen)),
            h("tr", null,
                h("td", null, "File last seen on"),
                h("td", null, this.data.lastseen)),
            h("tr", null,
                h("td", null, "Files count"),
                h("td", null, this.data.count))));
    }
};
__decorate([
    Prop()
], AppInfoTable.prototype, "data", void 0);
AppInfoTable = __decorate([
    Component({
        tag: 'app-info-table'
    })
], AppInfoTable);
export { AppInfoTable };
