/*! Built with http://stenciljs.com */
const{h:e}=window.App;class t{constructor(){this.categoryList=["AGRICULTURE","ENERGY","EQUITY INDEX","FX","INTEREST RATES","METALS","REAL ESTATE","WEATHER"],this.exchangeList=["COMEX","CBOT","CME","NYMEX","DME"],this.focusCatOptions=!1,this.focusExOptions=!1,this.searchTerm="",this.handleMultiSelectClick=(e=>{e.stopPropagation()}),this.handleSearchInput=(e=>{this.newSearch.emit(e.target.value)}),this.handleRadio=(e=>{this.newProductLevel.emit(e.target.value)}),this.handleCheckbox=(e=>{this.newInstrumType.emit(e.target.value)}),this.handleWrapClick=(()=>{this.focusCatOptions=!1,this.focusExOptions=!1}),this.handleReset=(()=>{this.resetFilter.emit()})}handleInputFocus(e){"category"==e.detail.id?this.focusCatOptions=!0:"exchange"==e.detail.id&&(this.focusExOptions=!0)}render(){return e("div",{onClick:this.handleWrapClick,class:"wrap"},e("div",null,"Refine Your Search"),e("app-button",{onClick:this.handleReset},"Reset"),e("div",{class:"input-wrap"},e("input",{class:"text-input",type:"text",maxlength:"150",value:this.searchTerm,onInput:this.handleSearchInput})),e("label",null,e("input",{type:"radio",name:"products",value:"individual",onClick:this.handleRadio,checked:"individual"==this.productLevel}),"Individual products"),e("label",null,e("input",{type:"radio",name:"products",value:"complete",onClick:this.handleRadio,checked:"complete"==this.productLevel}),"Complete individual exchange"),e("label",null,e("input",{type:"radio",name:"products",value:"all",onClick:this.handleRadio,checked:"all"==this.productLevel}),"All exchanges (All data)"),"individual"==this.productLevel&&e("div",null,e("strong",null,"Instrument Type"),e("label",null,e("input",{type:"checkbox",value:"future",onClick:this.handleCheckbox,checked:this.instrumType.indexOf("future")>=0}),"Futures"),e("label",null,e("input",{type:"checkbox",value:"option",onClick:this.handleCheckbox,checked:this.instrumType.indexOf("option")>=0}),"Options"),e("label",null,e("input",{type:"checkbox",value:"spread",onClick:this.handleCheckbox,checked:this.instrumType.indexOf("spread")>=0}),"Spreads")),"individual"==this.productLevel&&e("div",null,e("strong",null,"Asset Class"),e("app-multi-select",{id:"category",onClick:this.handleMultiSelectClick,selectedItems:this.selectedCats,options:this.categoryList,focusInput:this.focusCatOptions})),("individual"==this.productLevel||"complete"==this.productLevel)&&e("div",null,e("strong",null,"Exchange"),e("app-multi-select",{id:"exchange",onClick:this.handleMultiSelectClick,selectedItems:this.selectedExs,options:this.exchangeList,focusInput:this.focusExOptions})))}static get is(){return"app-control"}static get encapsulation(){return"shadow"}static get properties(){return{categoryList:{state:!0},exchangeList:{state:!0},focusCatOptions:{state:!0},focusExOptions:{state:!0},instrumType:{type:"Any",attr:"instrum-type"},productLevel:{type:String,attr:"product-level"},searchTerm:{type:String,attr:"search-term"},selectedCats:{type:"Any",attr:"selected-cats"},selectedExs:{type:"Any",attr:"selected-exs"}}}static get events(){return[{name:"newProductLevel",method:"newProductLevel",bubbles:!0,cancelable:!0,composed:!0},{name:"newSearch",method:"newSearch",bubbles:!0,cancelable:!0,composed:!0},{name:"newInstrumType",method:"newInstrumType",bubbles:!0,cancelable:!0,composed:!0},{name:"resetFilter",method:"resetFilter",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"inputFocus",method:"handleInputFocus"}]}static get style(){return".wrap.sc-app-control{height:100%}.input-wrap.sc-app-control{padding-left:0;border:1px solid var(--app-black);border-radius:3px;cursor:text;margin-top:3px}label.sc-app-control{display:block;padding-left:20px;vertical-align:baseline}input[type=checkbox].sc-app-control, input[type=radio].sc-app-control{margin-left:-20px;position:absolute}.text-input.sc-app-control{background-color:transparent;border:none;-webkit-box-shadow:none;box-shadow:none;width:100%;padding:0}.text-input.sc-app-control:focus{outline:0}"}}class s{constructor(){this.selectedItems=[],this.options=[],this.createSelected=(t=>e("li",{class:"category-item"},t)),this.creatOptions=(t=>e("option",{value:t})),this.handleInput=(e=>{var t=e.target.value;if(this.options.indexOf(t)>=0){var s=this.selectedItems.indexOf(t);s<0?this.newSelect.emit({data:t,id:this.el.id}):this.deleteSelect.emit({data:s,id:this.el.id}),e.target.value=""}}),this.handleDelete=(e=>{var t=e.keyCode||e.charCode,s=this.el.shadowRoot.querySelector(".text-input");8!=t&&46!=t||""!=s.value||this.deleteSelect.emit({data:this.selectedItems.length-1,id:this.el.id})}),this.handleClick=(()=>{this.inputFocus.emit({id:this.el.id})})}componentDidUpdate(){this.focusInput&&this.el.shadowRoot.querySelector(".text-input").focus()}render(){return e("div",{class:"multi-select"},e("ul",{onClick:this.handleClick},this.selectedItems.map(this.createSelected),e("li",null,e("input",{class:"text-input",type:"text",list:this.id,onInput:this.handleInput,onKeyDown:this.handleDelete}))),e("datalist",{id:this.id},this.options.map(this.creatOptions)))}static get is(){return"app-multi-select"}static get encapsulation(){return"shadow"}static get properties(){return{el:{elementRef:!0},focusInput:{type:Boolean,attr:"focus-input"},id:{type:String,attr:"id"},options:{type:"Any",attr:"options"},selectedItems:{type:"Any",attr:"selected-items"}}}static get events(){return[{name:"newSelect",method:"newSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"deleteSelect",method:"deleteSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"filterOptions",method:"filterOptions",bubbles:!0,cancelable:!0,composed:!0},{name:"inputFocus",method:"inputFocus",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"ul.sc-app-multi-select{list-style:none;padding-left:0;border:1px solid var(--app-black);border-radius:3px;cursor:text;margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap}li.sc-app-multi-select{display:inline-block;margin:3px;padding:5px;border-radius:3px;-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.multi-select.sc-app-multi-select{margin-bottom:3px;position:relative}.text-input.sc-app-multi-select{background-color:transparent;border:none;-webkit-box-shadow:none;box-shadow:none;width:100%;padding:0}.text-input.sc-app-multi-select:focus{outline:0}.category-item.sc-app-multi-select{background-color:var(--app-black);color:#fff}.showdropdonw.sc-app-multi-select{display:block}"}}export{t as AppControl,s as AppMultiSelect};