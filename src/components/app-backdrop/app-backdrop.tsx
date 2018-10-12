import { Component, Prop } from '@stencil/core';

@Component({
    tag:'app-backdrop',
    styleUrl:'app-backdrop.css',
    shadow:true
})

export class AppBackdrop {
    @Prop() open:boolean=false;
    render(){
        return (
        <div class={`backdrop ${this.open?'open':''}`}>
            <slot/>
        </div>)
    }
}