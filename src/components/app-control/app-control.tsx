import { Component, State, Prop, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
    tag:'app-control',
    styleUrl:'app-control.css',
    shadow:true
})

export class AppControl {
    @State() readonly categoryList:string[] = ['AGRICULTURE','ENERGY','EQUITY INDEX','FX','INTEREST RATES','METALS','REAL ESTATE','WEATHER'];
    @State() readonly exchangeList:string[] = ['COMEX','CBOT','CME','NYMEX','DME'];
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

    @Listen('inputFocus')
    handleInputFocus(event:CustomEvent) {
        if (event.detail.id=="category") {
            this.focusCatOptions=true;
        } else if (event.detail.id=="exchange") {
            this.focusExOptions=true;       
        }           
    }
    handleMultiSelectClick=(evt)=>{
        evt.stopPropagation();
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
    handleWrapClick=()=>{
           this.focusCatOptions=false;
           this.focusExOptions=false;
    }
    handleReset = ()=>{
        this.resetFilter.emit();
    }
    render(){
        return (
            <div onClick={this.handleWrapClick} class="wrap">
                <div>Refine Your Search</div>
                <app-button onClick={this.handleReset}>Reset</app-button>
                <div class="input-wrap">
                    <input class="text-input" type="text" maxlength="150" value={this.searchTerm} onInput={this.handleSearchInput}/>
                </div>
                <label><input type="radio" name="products" value="individual" onClick={this.handleRadio}
                checked={this.productLevel=="individual"}/>Individual products</label>
                <label><input type="radio" name="products" value="complete" onClick={this.handleRadio}
                checked={this.productLevel=="complete"}/>Complete individual exchange</label>
                <label><input type="radio" name="products" value="all" onClick={this.handleRadio}
                checked={this.productLevel=="all"}/>All exchanges (All data)</label>
                {this.productLevel=='individual'&&<div>
                <strong>Instrument Type</strong>
                    <label><input type="checkbox" value="future" onClick={this.handleCheckbox}
                    checked={this.instrumType.indexOf('future')>=0}/>Futures</label>
                    <label><input type="checkbox" value="option" onClick={this.handleCheckbox}
                    checked={this.instrumType.indexOf('option')>=0}/>Options</label>
                    <label><input type="checkbox" value="spread" onClick={this.handleCheckbox}
                    checked={this.instrumType.indexOf('spread')>=0}/>Spreads</label>
                </div>}
                {this.productLevel=='individual'&&<div>
                    <strong>Asset Class</strong>
                    <app-multi-select id="category" onClick={this.handleMultiSelectClick} selectedItems={this.selectedCats} 
                    options={this.categoryList} focusInput={this.focusCatOptions}>
                    </app-multi-select>
                </div>}
                {(this.productLevel=="individual"||this.productLevel=="complete")&&<div>
                    <strong>Exchange</strong>
                    <app-multi-select  id="exchange" onClick={this.handleMultiSelectClick} selectedItems={this.selectedExs} 
                    options={this.exchangeList} focusInput={this.focusExOptions}>
                    </app-multi-select>
                </div>}

            </div>)
    }
}