import { Component, Prop} from '@stencil/core';

@Component({
    tag:'app-button',
    styleUrl:'app-button.css',
    shadow:true
})

export class AppButton {
    @Prop() type:string='principal';
    @Prop() disabled:boolean=false;
    render(){
        return <button class={`${this.type} ${this.disabled?'disabled':''}`}><slot/></button>
    }
}