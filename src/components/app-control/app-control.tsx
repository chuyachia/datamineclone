import { Component, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag:'app-control',
    styleUrl:'app-control.css',
    shadow:true
})

export class AppControl {
    @Event() newSearch:EventEmitter;
    @Event() newInstrumType:EventEmitter;
    
    handleSearchInput=(evt)=>{
        this.newSearch.emit(evt.target.value);
    }
    handleCheckbox=(evt)=>{
        this.newInstrumType.emit(evt.target.value);
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
            </div>)
    }
}