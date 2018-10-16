import { Component, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'app-arrows',
  styleUrl : 'app-arrows.css',
  shadow:true
})

export class AppArrows {
    @Prop() text:string;
    @Prop() dataName:string;
    @Prop() selected:boolean;
    @Prop() direction:string;
    @Element() appArrosEl: HTMLElement;
    @State() arrowDir:string='';
    componentDidUpdate() {
        if (this.selected){
            this.arrowDir=this.direction;
        } else {
            this.arrowDir='';
        }
    }
    render(){
        return(<span class={this.arrowDir}>{this.text}</span>)
    }
    
}