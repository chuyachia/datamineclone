import { Component, Prop,  Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag:'app-multi-select',
    styleUrl:'app-multi-select.css',
    shadow:true
})

export class AppMultiSelect {
    @Element() el: HTMLElement;
    @Prop() id:string;
    @Prop() selectedItems: string[]=[];
    @Prop() options:string[]=[];
    @Prop() focusInput:boolean;
    @Event() newSelect:EventEmitter;
    @Event() deleteSelect:EventEmitter;
    @Event() filterOptions:EventEmitter;
    @Event() inputFocus:EventEmitter;
    createSelected= (cat:string)=>(<li class="category-item">{cat}</li>)
    creatOptions =(cat:string)=>(<option value={cat}/>)
    handleInput = (evt)=>{
        var target = evt.target.value;
        if (this.options.indexOf(target)>=0) {
            var indx = this.selectedItems.indexOf(target);
            if (indx <0) {
                this.newSelect.emit({data:target,id:this.el.id});
            } else {
                this.deleteSelect.emit({data:indx,id:this.el.id});
            }
            evt.target.value="";
        }
    }
    handleDelete =(evt)=>{
        var key = evt.keyCode || evt.charCode;
        var textInput = this.el.shadowRoot.querySelector(".text-input") as HTMLInputElement;
        if( (key == 8 || key == 46) &&textInput.value=="")
        this.deleteSelect.emit({data:this.selectedItems.length-1,id:this.el.id});
    }
    handleClick=()=>{
        this.inputFocus.emit({id:this.el.id});

    }
    componentDidUpdate(){
        if (this.focusInput) {
            var textInput = this.el.shadowRoot.querySelector(".text-input") as HTMLInputElement;
            textInput.focus();
        }
    }
    render(){
        return(
                <div class="multi-select">
                    <ul onClick={this.handleClick} >
                        {this.selectedItems.map(this.createSelected)}
                        <li><input class="text-input" type="text" 
                        list={this.id}
                        onInput={this.handleInput} 
                        onKeyDown={this.handleDelete}/></li>
                    </ul>
                    <datalist id = {this.id}>
                        {this.options.map(this.creatOptions)}
                    </datalist>
                </div>            
            )
    }
}