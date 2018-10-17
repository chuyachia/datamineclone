import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-pagination',
  styleUrl : 'app-pagination.css',
  shadow:true
})

export class AppPagination {
    @Prop() nPage:number;
    @Prop() maxSeq:number;
    @State() showedPages: number[]=[];
    @Prop() curPage: number;
    @Event() changePage: EventEmitter;
    
    changeShowedPages=(page)=>{
        var newShowed=[];
        if (this.nPage<=7){
            for(let i = 1;i<=this.nPage;i++){
                newShowed.push(i);
            }
        } else if (page-1<this.maxSeq-1){
            var maxPage= Math.min(this.maxSeq,this.nPage);
            for(let i = 1;i<=maxPage;i++){
                newShowed.push(i);
            }
            if (maxPage<this.nPage) {
                newShowed.push(-1);
                newShowed.push(this.nPage);
            }
        } else if (this.nPage-page<this.maxSeq-1) {
            newShowed.push(1);
            newShowed.push(-1);
            for(let i = this.nPage-this.maxSeq+1;i<=this.nPage;i++){
                newShowed.push(i);
            }
        } else {
            newShowed.push(1);
            newShowed.push(-1);  
            newShowed.push(page-1);
            newShowed.push(page);
            newShowed.push(page+1);
            newShowed.push(-1);
            newShowed.push(this.nPage);
        }
        this.showedPages = newShowed;
    }
    handleNextClick=()=>{
        if (this.curPage<this.nPage) {
            this.changePage.emit(this.curPage+1);
        }
    }
    handlePrevClick=()=>{
        if (this.curPage>1) {
            this.changePage.emit(this.curPage-1);
        }
    }
    handlePageClick=(evt)=>{
        var page =  parseInt(evt.srcElement.getAttribute('data-page'));
        if (page>0){
            this.changePage.emit(page);
        }
    }
    
    createPages=(page)=>(<li class={page==this.curPage?'cur-page':''}>
    <span data-page={page} class={page<0?'un-clickable':''} onClick={this.handlePageClick}>{page>0?page:'...'}</span>
    </li>)
    
    componentDidUpdate() {
        this.changeShowedPages(this.curPage)
    }
    
    render(){
        return(
            <ul>
                <li>
                    <span class={this.curPage==1?'un-clickable':''} onClick={this.handlePrevClick}>Previous</span>
                </li>
                {this.showedPages.map(this.createPages)}
                <li>
                    <span class={this.curPage==this.nPage?'un-clickable':''} onClick={this.handleNextClick}>Next</span>
                </li>
            </ul>)
    }
}