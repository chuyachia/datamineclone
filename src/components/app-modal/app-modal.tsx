import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
    tag:'app-modal',
    styleUrl:'app-modal.css',
    shadow:true
})

export class AppModal {
    @Element() el: HTMLElement;
    @Prop() modalTitle:string;
    @Prop() closeButton:boolean=true;
    @Prop() confirmButton:boolean=true;
    @Prop() closeButtonText:string='Close';
    @Prop() confirmButtonText:string='Confirm';
    @Prop() open:boolean;
    @Event() closeModal: EventEmitter;
    handleCloseClick=()=>{
        this.closeModal.emit(this.el.id);
    };
    
    render(){
        return (
        <app-backdrop open={this.open}>
            <div class={`modal ${this.open?"show":""}`}>
                <h2>{this.modalTitle}</h2>
                <span class="close" onClick={this.handleCloseClick}><strong>x</strong></span>
                <hr/>
                <slot/>
                {this.closeButton&&<app-button type="cancel" onClick={this.handleCloseClick}>{this.closeButtonText}</app-button>}
                {this.confirmButton&&<app-button>{this.confirmButtonText}</app-button>}
            </div>
        </app-backdrop>)
    }
}
