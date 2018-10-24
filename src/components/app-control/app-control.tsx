import { Component, State, Prop, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
    tag:'app-control',
    styleUrl:'app-control.css',
    shadow:true
})

export class AppControl {
    @State() readonly categoryList:string[] = ['AGRICULTURE','ENERGY','EQUITY INDEX','FX','INTEREST RATES','METALS','REAL ESTATE','WEATHER'];
    @State() readonly exchangeList:string[] = ['COMEX','CBOT','CME','NYMEX','DME'];
    @State() showedCats:string[]= this.categoryList;
    @State() showedExs:string[]= this.exchangeList;
    @State() showCatOptions:boolean=false;
    @State() showExOptions:boolean=false;
    @State() focusCatOptions:boolean=false;
    @State() focusExOptions:boolean=false;
    @Prop() searchTerm:string='';
    @Prop() instrumType:string[];
    @Prop() selectedCats:string[];
    @Prop() selectedExs:string[];
    @Prop() productLevel:string;
    @Event() newProductLevel:EventEmitter;
    @Event() newSearch:EventEmitter;
    @Event() newInstrumType:EventEmitter;
    @Event() resetFilter:EventEmitter;
    @Listen('newProductLevel')
    handleNewProductLevel() {
        this.showedCats =  this.categoryList;
        this.showedExs = this.exchangeList;
    }
    @Listen('filterOptions')
    handleFilterOptions(event:CustomEvent) {
        if (event.detail.id=="category") {
            this.showedCats =  this.categoryList.filter(function(cat){
                return event.detail.data.test(cat);
            })
            this.showCatOptions =true;
        } else if (event.detail.id=="exchange") {
            this.showedExs=  this.exchangeList.filter(function(cat){
                return event.detail.data.test(cat);
            }) 
            this.showExOptions =true;
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
    handleRadio=(evt)=>{
        this.newProductLevel.emit(evt.target.value);
    }
    handleCheckbox=(evt)=>{
        this.newInstrumType.emit(evt.target.value);
    }
    handleClick=(evt)=>{
        if (evt.target.tagName=="APP-MULTI-SELECT") {
            if (evt.target.id=="category") {
                this.showCatOptions = this.showCatOptions?false:true;
                this.focusCatOptions=true;
            } else if (evt.target.id=="exchange"){
                this.showExOptions = this.showExOptions?false:true;
                this.focusExOptions=true;
            }
        } else {
           this.showCatOptions =false;
           this.showExOptions = false;
           this.focusCatOptions=false;
           this.focusExOptions=false;
        }
    }
    handleReset = ()=>{
        this.resetFilter.emit();
    }
    render(){
        return (
            <div onClick={this.handleClick} class="wrap">
                <div>Refine Your Search</div>
                <app-button onClick={this.handleReset}>Reset</app-button>
                <div class="input-wrap">
                    <input class="text-input" type="text" maxlength="150" value={this.searchTerm} onInput={this.handleSearchInput}/>
                </div>
                <label><input type="radio" name="products" value="individual" onInput={this.handleRadio}
                checked={this.productLevel=="individual"}/>Individual products</label>
                <label><input type="radio" name="products" value="complete" onInput={this.handleRadio}
                checked={this.productLevel=="complete"}/>Complete individual exchange</label>
                <label><input type="radio" name="products" value="all" onInput={this.handleRadio}
                checked={this.productLevel=="all"}/>All exchanges (All data)</label>
                {this.productLevel=='individual'&&<div>
                <strong>Instrument Type</strong>
                    <label><input type="checkbox" value="future" onInput={this.handleCheckbox}
                    checked={this.instrumType.indexOf('future')>=0}/>Futures</label>
                    <label><input type="checkbox" value="option" onInput={this.handleCheckbox}
                    checked={this.instrumType.indexOf('option')>=0}/>Options</label>
                    <label><input type="checkbox" value="spread" onInput={this.handleCheckbox}
                    checked={this.instrumType.indexOf('spread')>=0}/>Spreads</label>
                </div>}
                {this.productLevel=='individual'&&<div>
                    <strong>Asset Class</strong>
                    <app-multi-select id="category" selectedItems={this.selectedCats} show={this.showCatOptions}
                    options={this.showedCats} options-length={this.categoryList.length} focusInput={this.focusCatOptions}>
                    </app-multi-select>
                </div>}
                {(this.productLevel=="individual"||this.productLevel=="complete")&&<div>
                    <strong>Exchange</strong>
                    <app-multi-select id="exchange" selectedItems={this.selectedExs} show={this.showExOptions}
                    options={this.showedExs} options-length={this.exchangeList.length} focusInput={this.focusExOptions}>
                    </app-multi-select>
                </div>}

            </div>)
    }
}