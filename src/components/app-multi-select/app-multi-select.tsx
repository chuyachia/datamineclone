import { Component, Prop, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag:'app-multi-select',
    styleUrl:'app-multi-select.css',
    shadow:true
})

export class AppMultiSelect {
    @Element() el: HTMLElement;
    @Prop() selectedItems: string[]=[];
    @Prop() options:string[]=[];
    @Prop() optionsLength:number;
    @Prop() show:boolean=false;
    @Event() newSelect:EventEmitter;
    @Event() deleteSelect:EventEmitter;
    @Event() filterOptions:EventEmitter;
    @Event() hideOptions:EventEmitter;
    @Event() inputFocus:EventEmitter;
    
    createSelected= (cat)=>(<li class="category-item">{cat}</li>)
    creatOptions =(cat)=>(<option value={cat}>{cat}</option>)
    handleInput = (evt)=>{
        var target = RegExp(evt.target.value,'i');
        this.filterOptions.emit({data:target,id:this.el.id});
    }
    handleDelete =(evt)=>{
        var key = evt.keyCode || evt.charCode;
        if( key == 8 || key == 46 )
        this.deleteSelect.emit({data:this.selectedItems.length-1,id:this.el.id});
         var textInput =  this.el.shadowRoot.querySelector(".text-input") as HTMLInputElement;
        textInput.focus();
    }
    handleSelection=(evt)=>{
        // fired twice?
        var target = evt.target.value;
        var indx = this.selectedItems.indexOf(target);
        if (indx <0) {
            this.newSelect.emit({data:target,id:this.el.id});
        } else {
            this.deleteSelect.emit({data:indx,id:this.el.id});
        }
        var selectElement = this.el.shadowRoot.querySelector(".multi-select-option") as HTMLInputElement;
        selectElement.value="";
        this.hideOptions.emit({id:this.el.id});
    }
    handleClick=()=>{
        this.inputFocus.emit({id:this.el.id});
    }

    render(){
        return(
                <div class="multi-select">
                    <ul onClick={this.handleClick} >
                        {this.selectedItems.map(this.createSelected)}
                        <li><input class="text-input" type="text" 
                        onInput={this.handleInput} 
                        onKeyDown={this.handleDelete}/></li>
                    </ul>
                    <select class={`multi-select-option ${this.show?'showdropdonw':''}`}
                    size={this.optionsLength}
                    onInput={this.handleSelection}>
                        {this.options.map(this.creatOptions)}
                    </select >
                </div>            
            )
    }
}