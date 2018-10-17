import { Component, State, Prop, Event, EventEmitter, Listen, Watch } from '@stencil/core';

@Component({
    tag:'app-control',
    styleUrl:'app-control.css',
    shadow:true
})

export class AppControl {
    @State() categoryList:string[] = ['AGRICULTURE','ENERGY','EQUITY INDEX','FX','INTEREST RATES','METALS','REAL ESTATE','WEATHER'];
    @State() exchangeList:string[] = ['COMEX','CBOT','CME'];
    @State() showedCats:string[]= this.categoryList;
    @State() showedExs:string[]= this.exchangeList;
    @State() showCatOptions:boolean=false;
    @State() showExOptions:boolean=false;
    @State() focusCatOptions:boolean=false;
    @State() focusExOptions:boolean=false;
    @Prop() selectedCats:string[];
    @Prop() selectedExs:string[];
    @Event() newSearch:EventEmitter;
    @Event() newInstrumType:EventEmitter;

    @Listen('filterOptions')
    handleFilterOptions(event:CustomEvent) {
        if (event.detail.id=="category") {
            this.showedCats =  this.categoryList.filter(function(cat){
                return event.detail.data.test(cat);
            })
        } else if (event.detail.id=="exchange") {
            this.showedExs=  this.categoryList.filter(function(cat){
                return event.detail.data.test(cat);
            }) 
        }
    }
    @Listen('hideOptions')
    handleShowHide(event:CustomEvent) {
        if (event.detail.id=="category") {
            this.showCatOptions=false;
        } else if (event.detail.id=="exchange") {
            this.showExOptions=false;       
        }        
    }
    @Listen('inputFocus')
    handleInputFocus(event:CustomEvent) {
        if (event.detail.id=="category") {
            this.focusCatOptions=true;
        } else if (event.detail.id=="exchange") {
            this.focusExOptions=true;       
        }           
    }
    handleSearchInput=(evt)=>{
        this.newSearch.emit(evt.target.value);
    }
    handleCheckbox=(evt)=>{
        this.newInstrumType.emit(evt.target.value);
    }
    handleClick=(evt)=>{
        this.showCatOptions = false;
        this.showExOptions=false;
        if (this.focusCatOptions) {
            this.focusCatOptions=false;
            this.showCatOptions = true;
        } else if (this.focusExOptions){
            this.focusExOptions=false;
            this.showExOptions=true;
        }
    }
    render(){
        return (
            <div onClick={this.handleClick} class="wrap">
                <div class="input-wrap">
                    <input class="text-input" type="text" maxlength="150" onInput={this.handleSearchInput}/>
                </div>
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
                    <app-multi-select id="category" selectedItems={this.selectedCats} show={this.showCatOptions}
                    options={this.showedCats} options-length={this.categoryList.length}>
                    </app-multi-select>
                    <app-multi-select id="exchange" selectedItems={this.selectedExs} show={this.showExOptions}
                    options={this.showedExs} options-length={this.exchangeList.length}>
                    </app-multi-select>

            </div>)
    }
}