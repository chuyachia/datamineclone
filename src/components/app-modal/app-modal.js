var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Event, Element } from '@stencil/core';
let AppModal = class AppModal {
    constructor() {
        this.closeButton = true;
        this.confirmButton = true;
        this.closeButtonText = 'Close';
        this.confirmButtonText = 'Confirm';
        this.handleCloseClick = () => {
            this.closeModal.emit(this.el.id);
        };
    }
    render() {
        return (h("app-backdrop", { open: this.open },
            h("div", { class: "modal" },
                h("h2", null, this.modalTitle),
                h("span", { class: "close", onClick: this.handleCloseClick },
                    h("strong", null, "x")),
                h("hr", null),
                h("slot", null),
                this.closeButton && h("app-button", { type: "cancel", onClick: this.handleCloseClick }, this.closeButtonText),
                this.confirmButton && h("app-button", null, this.confirmButtonText))));
    }
};
__decorate([
    Element()
], AppModal.prototype, "el", void 0);
__decorate([
    Prop()
], AppModal.prototype, "modalTitle", void 0);
__decorate([
    Prop()
], AppModal.prototype, "closeButton", void 0);
__decorate([
    Prop()
], AppModal.prototype, "confirmButton", void 0);
__decorate([
    Prop()
], AppModal.prototype, "closeButtonText", void 0);
__decorate([
    Prop()
], AppModal.prototype, "confirmButtonText", void 0);
__decorate([
    Prop()
], AppModal.prototype, "open", void 0);
__decorate([
    Event()
], AppModal.prototype, "closeModal", void 0);
AppModal = __decorate([
    Component({
        tag: 'app-modal',
        styleUrl: 'app-modal.css',
        shadow: true
    })
], AppModal);
export { AppModal };
