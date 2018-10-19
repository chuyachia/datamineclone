var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Element, State } from '@stencil/core';
let AppArrows = class AppArrows {
    constructor() {
        this.arrowDir = '';
    }
    componentDidUpdate() {
        if (this.selected) {
            this.arrowDir = this.direction;
        }
        else {
            this.arrowDir = '';
        }
    }
    render() {
        return (h("span", { class: this.arrowDir }, this.text));
    }
};
__decorate([
    Prop()
], AppArrows.prototype, "text", void 0);
__decorate([
    Prop()
], AppArrows.prototype, "dataName", void 0);
__decorate([
    Prop()
], AppArrows.prototype, "selected", void 0);
__decorate([
    Prop()
], AppArrows.prototype, "direction", void 0);
__decorate([
    Element()
], AppArrows.prototype, "appArrosEl", void 0);
__decorate([
    State()
], AppArrows.prototype, "arrowDir", void 0);
AppArrows = __decorate([
    Component({
        tag: 'app-arrows',
        styleUrl: 'app-arrows.css',
        shadow: true
    })
], AppArrows);
export { AppArrows };
