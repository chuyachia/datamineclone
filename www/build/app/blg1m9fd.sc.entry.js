/*! Built with http://stenciljs.com */
const{h:t}=window.App;class e{constructor(){this.open=!1}render(){return t("div",{class:`backdrop ${this.open?"open":""}`},t("slot",null))}static get is(){return"app-backdrop"}static get encapsulation(){return"shadow"}static get properties(){return{open:{type:Boolean,attr:"open"}}}static get style(){return".backdrop.sc-app-backdrop{position:fixed;height:100%;width:100%;top:0;left:0;visibility:hidden;background:rgba(204,204,204,.3);opacity:0;z-index:5;overflow-y:scroll;-webkit-transition:visibility .3s linear,opacity .3s linear;transition:visibility .3s linear,opacity .3s linear}.backdrop.open.sc-app-backdrop{visibility:visible;opacity:1;-webkit-transition-delay:0s;transition-delay:0s}"}}class s{constructor(){this.type="principal",this.disabled=!1}render(){return t("button",{class:`${this.type} ${this.disabled?"disabled":""}`},t("slot",null))}static get is(){return"app-button"}static get encapsulation(){return"shadow"}static get properties(){return{disabled:{type:Boolean,attr:"disabled"},type:{type:String,attr:"type"}}}static get style(){return"button.sc-app-button{border-width:2px;border-style:solid;border-radius:3px;padding:5px;margin-top:3px;margin-bottom:3px;margin-right:3px;cursor:pointer}button.disabled.sc-app-button, button.disabled.sc-app-button:hover{opacity:.5;color:#fff;cursor:not-allowed}.principal.sc-app-button{background:var(--app-blue);color:#fff;border-color:var(--app-blue)}.principal.sc-app-button:not(.disabled):hover{background:#fff;color:var(--app-blue)}.cancel.sc-app-button{background:var(--app-deep-grey);color:#fff;border-color:var(--app-deep-grey)}.cancel.sc-app-button:not(.disabled):hover{background:#fff;color:var(--app-deep-grey)}.highlight.sc-app-button{background:var(--app-yellow);color:#fff;border-color:var(--app-yellow)}.highlight.sc-app-button:not(.disabled):hover{background:#fff;color:var(--app-yellow)}"}}export{e as AppBackdrop,s as AppButton};