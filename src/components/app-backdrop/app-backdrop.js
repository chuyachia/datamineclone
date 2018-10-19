var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
let AppBackdrop = class AppBackdrop {
    constructor() {
        this.open = false;
    }
    render() {
        return (h("div", { class: `backdrop ${this.open ? 'open' : ''}` },
            h("slot", null)));
    }
};
__decorate([
    Prop()
], AppBackdrop.prototype, "open", void 0);
AppBackdrop = __decorate([
    Component({
        tag: 'app-backdrop',
        styleUrl: 'app-backdrop.css',
        shadow: true
    })
], AppBackdrop);
export { AppBackdrop };
