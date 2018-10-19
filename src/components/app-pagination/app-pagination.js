var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, State, Event } from '@stencil/core';
let AppPagination = class AppPagination {
    constructor() {
        this.showedPages = [];
        this.changeShowedPages = (page) => {
            var newShowed = [];
            if (this.nPage <= 7) {
                for (let i = 1; i <= this.nPage; i++) {
                    newShowed.push(i);
                }
            }
            else if (page - 1 < this.maxSeq - 1) {
                var maxPage = Math.min(this.maxSeq, this.nPage);
                for (let i = 1; i <= maxPage; i++) {
                    newShowed.push(i);
                }
                if (maxPage < this.nPage) {
                    newShowed.push(-1);
                    newShowed.push(this.nPage);
                }
            }
            else if (this.nPage - page < this.maxSeq - 1) {
                newShowed.push(1);
                newShowed.push(-1);
                for (let i = this.nPage - this.maxSeq + 1; i <= this.nPage; i++) {
                    newShowed.push(i);
                }
            }
            else {
                newShowed.push(1);
                newShowed.push(-1);
                newShowed.push(page - 1);
                newShowed.push(page);
                newShowed.push(page + 1);
                newShowed.push(-1);
                newShowed.push(this.nPage);
            }
            this.showedPages = newShowed;
        };
        this.handleNextClick = () => {
            if (this.curPage < this.nPage) {
                this.changePage.emit(this.curPage + 1);
            }
        };
        this.handlePrevClick = () => {
            if (this.curPage > 1) {
                this.changePage.emit(this.curPage - 1);
            }
        };
        this.handlePageClick = (evt) => {
            var page = parseInt(evt.srcElement.getAttribute('data-page'));
            if (page > 0) {
                this.changePage.emit(page);
            }
        };
        this.createPages = (page) => (h("li", { class: `${page == this.curPage ? 'cur-page' : ''} ${page < 0 ? 'unclickable' : ''}` },
            h("span", { "data-page": page, onClick: this.handlePageClick }, page > 0 ? page : '...')));
    }
    componentDidUpdate() {
        this.changeShowedPages(this.curPage);
    }
    render() {
        return (h("ul", null,
            h("li", { class: this.curPage == 1 ? 'unclickable' : '' },
                h("span", { onClick: this.handlePrevClick }, "Previous")),
            this.showedPages.map(this.createPages),
            h("li", { class: this.curPage == this.nPage ? 'unclickable' : '' },
                h("span", { onClick: this.handleNextClick }, "Next"))));
    }
};
__decorate([
    Prop()
], AppPagination.prototype, "nPage", void 0);
__decorate([
    Prop()
], AppPagination.prototype, "maxSeq", void 0);
__decorate([
    State()
], AppPagination.prototype, "showedPages", void 0);
__decorate([
    Prop()
], AppPagination.prototype, "curPage", void 0);
__decorate([
    Event()
], AppPagination.prototype, "changePage", void 0);
AppPagination = __decorate([
    Component({
        tag: 'app-pagination',
        styleUrl: 'app-pagination.css',
        shadow: true
    })
], AppPagination);
export { AppPagination };
