import { Component, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag:'app-control',
    styleUrl:'app-control.css',
    shadow:true
})

export class AppControl {
    @Element() el: HTMLElement;
    @State() categoryList:string[] = ['AGRICULTURE','ENERGY','EQUITY INDEX'];
    @State() showedCats:string[]=this.categoryList;
    @State() selectedCats:string[] =[];
    @State() showDropDown:boolean=false;
    @Event() newSearch:EventEmitter;
    @Event() newInstrumType:EventEmitter;
    
    handleSearchInput=(evt)=>{
        this.newSearch.emit(evt.target.value);
    }
    handleCheckbox=(evt)=>{
        this.newInstrumType.emit(evt.target.value);
    }
    creatOptons =(cat)=>(<option value={cat}>{cat}</option>)
    showHideDropDown=()=>{
        this.showDropDown=this.showDropDown?false:true;
    }
    handleSelection=(evt)=>{
        this.showDropDown=false;
        var target = evt.target.value;
        var indx = this.selectedCats.indexOf(target);
        if (indx <0) {
            this.selectedCats = [...this.selectedCats,evt.target.value];
        } else {
            this.selectedCats = this.selectedCats.slice(0,indx).concat(this.selectedCats.slice(indx+1));
        }
        var selectElement = this.el.shadowRoot.querySelector("#category") as HTMLInputElement;
        selectElement.value="";
        this.showedCats = this.categoryList;
    }
    createSelectedCat = (cat)=>(<li class="category-item">{cat}</li>)
    handleCategoryInput = (evt)=>{
        var target = RegExp(evt.target.value,'i');
        this.showedCats =  this.categoryList.filter(function(cat){
            return target.test(cat);
        })
    }
    handleCategoryDelete =(evt)=>{
        var key = evt.keyCode || evt.charCode;
        if( key == 8 || key == 46 )
        this.selectedCats = this.selectedCats.slice(0,this.selectedCats.length-1);
    }
    render(){
        return (
            <div>
                <input type="text" maxlength="150" onInput={this.handleSearchInput}/>
                <div>
                    <div>
                        <input type="checkbox" value="future" onInput={this.handleCheckbox}/>
                        <label>Futures</label>
                    </div>
                    <div>
                        <input type="checkbox" value="option" onInput={this.handleCheckbox}/>
                        <label>Options</label>
                    </div>
                    <div>
                        <input type="checkbox" value="spread" onInput={this.handleCheckbox}/>
                        <label>Spreads</label>
                    </div>
                </div>
                <div>
                    <ul class="multi-select">
                        {this.selectedCats.map(this.createSelectedCat)}
                        <li><input class="text-input" type="text" 
                        onInput={this.handleCategoryInput} 
                        onClick={this.showHideDropDown}
                        onKeyDown={this.handleCategoryDelete}/></li>
                    </ul>
                    <select id="category" class={this.showDropDown?'showdropdonw':''}
                    size={this.categoryList.length}
                    onInput={this.handleSelection}>
                        <option value="" selected disabled hidden></option>
                        {this.showedCats.map(this.creatOptons)}
                    </select >
                </div>
            </div>)
    }
}