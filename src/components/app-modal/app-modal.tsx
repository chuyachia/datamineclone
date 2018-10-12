import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag:'app-modal',
    styleUrl:'app-modal.css',
    shadow:true
})

export class AppModal {
    @Prop() modalTitle:string;
    @Prop() closeButton:boolean=true;
    @Prop() confirmButton:boolean=true;
    @Prop() closeButtonText:string='Close';
    @Prop() confirmButtonText:string='Confirm';
    @Prop() open:boolean;
    @Event() closeModal: EventEmitter;
    handleCloseClick=()=>{
        this.closeModal.emit('');
    };
    
    render(){
        return (
        <app-backdrop open={this.open}>
            <div class="modal">
                <h2>{this.modalTitle}</h2>
                <span class="close" onClick={this.handleCloseClick}>x</span>
                <hr/>
                <slot/>
                {this.closeButton&&<button onClick={this.handleCloseClick}>{this.closeButtonText}</button>}
                {this.confirmButton&&<button>{this.confirmButtonText}</button>}
            </div>
        </app-backdrop>)
    }
}
