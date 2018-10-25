/*! Built with http://stenciljs.com */
App.loadBundle("blg1m9fd",["exports"],function(e){var t=window.App.h,n=function(){function e(){this.open=!1}return e.prototype.render=function(){return t("div",{class:"backdrop "+(this.open?"open":"")},t("slot",null))},Object.defineProperty(e,"is",{get:function(){return"app-backdrop"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{open:{type:Boolean,attr:"open"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".backdrop{position:fixed;height:100%;width:100%;top:0;left:0;visibility:hidden;background:rgba(204,204,204,.3);opacity:0;z-index:5;overflow-y:scroll;-webkit-transition:visibility .3s linear,opacity .3s linear;transition:visibility .3s linear,opacity .3s linear}.backdrop.open{visibility:visible;opacity:1;-webkit-transition-delay:0s;transition-delay:0s}"},enumerable:!0,configurable:!0}),e}(),r=function(){function e(){this.type="principal",this.disabled=!1}return e.prototype.render=function(){return t("button",{class:this.type+" "+(this.disabled?"disabled":"")},t("slot",null))},Object.defineProperty(e,"is",{get:function(){return"app-button"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{disabled:{type:Boolean,attr:"disabled"},type:{type:String,attr:"type"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"button{border-width:2px;border-style:solid;border-radius:3px;padding:5px;margin-top:3px;margin-bottom:3px;margin-right:3px;cursor:pointer}button.disabled,button.disabled:hover{opacity:.5;color:#fff;cursor:not-allowed}.principal{background:var(--app-blue);color:#fff;border-color:var(--app-blue)}.principal:not(.disabled):hover{background:#fff;color:var(--app-blue)}.cancel{background:var(--app-deep-grey);color:#fff;border-color:var(--app-deep-grey)}.cancel:not(.disabled):hover{background:#fff;color:var(--app-deep-grey)}.highlight{background:var(--app-yellow);color:#fff;border-color:var(--app-yellow)}.highlight:not(.disabled):hover{background:#fff;color:var(--app-yellow)}"},enumerable:!0,configurable:!0}),e}();e.AppBackdrop=n,e.AppButton=r,Object.defineProperty(e,"__esModule",{value:!0})});