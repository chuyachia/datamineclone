import { Component, State, Prop, Listen, Event, EventEmitter } from '@stencil/core';
import {ProductData} from '../../datatypes/datatypes';
import csv from 'csvtojson';
import getData from '../../util/getData.js';
@Component({
  tag: 'app-main',
  styleUrl : 'app-main.css',
  shadow:true
})

export class AppTable {
    @Prop() nrowPage: number;
    @State() data: ProductData[] = [];
    @State() sortDir: string = '';
    @State() criteria:string = null;
    @State() selected: string[]=[];
    @State() curPage: number=1;
    @State() infoModalOpen: boolean=false;
    @State() selectModalOpen: boolean=false;
    @State() infoData : ProductData={
        product:'',
        exchange:'',
        category:'',
        symbol:'',
        groupcode:'',
        productcode:'',
        foi:'',
        spread:false,
        globextrad:false
    };
    @State() readonly exchangeNameMatch:Object = {
        XCEC:"COMEX",
        XCBT:"CBOT",
        XCME:"CME",
        XNYM:"NYMEX",
        DUMX:"DME"
    };
    @State() searchTerm : string='';
    @State() instrumType:string[]=[];
    @State() category:string[]=[];
    @State() exchange:string[]=[];
    @State() curPageData :ProductData[] = [];
    @State() dataLength: number = this.data.length;
    @State() productLevel:string="individual";
    @Event() openModal :EventEmitter;
    @Listen('changePage')
    changePageHandler(event:CustomEvent){
        this.curPage = event.detail;
        this.updateShowedData();
    }
    @Listen('closeModal')
    closeModalHandler(event:CustomEvent){
        if (event.detail=="product-select") {
            this.selectModalOpen = false;
        } else if (event.detail=="product-info") {
            this.infoModalOpen = false;
        }
    }
    @Listen('newSearch')
    newSearchHandler(event:CustomEvent){
        this.curPage = 1;
        this.searchTerm = event.detail;
        this.updateShowedData();
    }
    @Listen('newInstrumType')
    newInstrumTypeHandler(event:CustomEvent) {
        var target = event.detail;
        var indx = this.instrumType.indexOf(target);
        if (indx==-1) {
            this.instrumType = [...this.instrumType,target];
        } else {
            this.instrumType = this.instrumType.slice(0,indx).concat(this.instrumType.slice(indx+1));
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    @Listen('newSelect')
    handleNewSelect(event:CustomEvent){
        var {data,id} = event.detail;
        if (data=="") return;
        if (id=="category") {
            this.category = [...this.category,data];
        } else if (event.detail.id=="exchange") {
            this.exchange = [...this.exchange,data];
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    @Listen('newProductLevel')
    handleNewProducLevel(event:CustomEvent) {
        this.productLevel = event.detail;
        this.instrumType = [];
        this.category = [];
        this.exchange = [];
        this.searchTerm ='';
        this.curPage = 1;
        this.updateShowedData();
    }
    @Listen('deleteSelect')
    handleDeleteSelect(event:CustomEvent) {
        var {data,id} = event.detail;
        if (id=="category") {
            this.category = this.category.slice(0,data).concat(
                this.category.slice(data+1));
        } else if (event.detail.id=="exchange") {
            this.exchange = this.exchange.slice(0,data).concat(
                this.exchange.slice(data+1));            
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    @Listen('resetFilter')
    handleResetFilter(){
        this.productLevel = 'individual'
        this.instrumType = [];
        this.category = [];
        this.searchTerm ='';  
        this.curPage = 1;
        this.updateShowedData();
    }
    updateShowedData=()=>{
        var filteredData = this.data;
        if (this.searchTerm.length>1||this.instrumType.length>0||this.category.length>0||this.exchange.length>0||this.productLevel!==null) {
            var target = RegExp(this.searchTerm,'i');
            filteredData = this.data.filter((row)=>{
                var level;
                var term = target.test(row.product)||target.test(row.symbol);
                var instrum;
                var instrumSum= 0;
                var cat;
                var exch;
                if (this.productLevel=='individual'){
                    level = !/Complete/.test(row.product)
                } else if (this.productLevel=='complete') {
                    level = /Complete Exchange/.test(row.product)
                } else if (this.productLevel=='all') {
                    level = /Complete all/.test(row.product)
                }
                this.instrumType.forEach(function(type){
                    instrumSum+=row[type];
                })
                if (this.instrumType.length==0) {
                    instrum=true;
                } else {
                    if (instrumSum>0)
                     instrum = true;
                     else
                     instrum = false;
                }
                if (this.category.length==0){
                    cat = true;
                } else {
                    cat = this.category.indexOf(row.category)>=0;
                }
                if (this.exchange.length==0){
                    exch = true;
                } else {
                    exch = this.exchange.indexOf(this.exchangeNameMatch[row.exchange])>=0;
                }
                return term&&instrum&&cat&&exch&&level;
            });

        }
        if (this.criteria!=null) {
            filteredData.sort((a,b)=>{
                if (a[this.criteria]<b[this.criteria]) {
                    return this.sortDir=='desc'?-1:1;
                } else if (a[this.criteria]>b[this.criteria]){
                    return this.sortDir=='desc'?1:-1;
                } else {
                    return 0;
                }
            });
        }
        this.dataLength = filteredData.length;
        this.curPageData = filteredData.slice((this.curPage-1)*this.nrowPage,this.curPage*this.nrowPage);        
    }
    componentDidLoad(){
        getData('https://cdn.glitch.com/1e8c939e-c923-420c-b9e8-e4fed617755f%2Fproductsheet.csv')
        .then((response)=>{
            csv({
                delimiter:';',
                trim:true
            }).fromString(response)
            .then(function(parsed){
                return parsed.map(function(row){
                    var symbol = [row.BBO_CODE,row.RLC_CODE,row.MD_CODE,row.MBO_CODE,row.BLOCK_CODE,row.EOD_CODE,row.TICK_CODE]
                    symbol = symbol.filter(function(s){return s!=="null"});
                    return {
                        product: row.PROD_NAME,
                        exchange:row.EXCH_CODE,
                        category:row.PROD_CATEGORY,
                        symbol:symbol.length>0?symbol[0]:'',
                        groupcode:row.GROUP_CODE,
                        productcode:row.PROD_CODE,
                        foi:row.FOI,
                        spread:row.SPREAD_IND==1?true:false,
                        future:row.FOI=="FUT"?true:false,
                        option:row.FOI=="OPT"?true:false,
                        globextrad:row.GLOBEX_TRADED==1?true:false
                    }
                }).filter(function(row){
                    return row.product.length>0&&row.symbol.length>0&&row.symbol!='null';
                })
            }).then((cleaned)=>{
                this.data = cleaned;
                this.updateShowedData();
            })
        }).catch(function(error){
            console.log(error);
        })
    }
    handleProductClick = (evt)=>{
        var el = evt.srcElement;
        var data = el.dataset;
        this.infoModalOpen = true;
        this.openModal.emit();
        this.infoData= data;
            
    }
    handleSortClick=(evt)=>{
        this.criteria = evt.srcElement.getAttribute('data-name');
        this.sortDir = this.sortDir=='desc'?'asc':'desc';
        this.updateShowedData();
    }
    
    handleSelect=(evt)=>{
        var target = evt.target.value;
        var indx = this.selected.indexOf(target);
        if (indx==-1){
            this.selected = [...this.selected,target];   
        } else {
            this.selected = this.selected.slice(0,indx).concat(this.selected.slice(indx+1));
        }
    }
    addSelection =()=>{
        this.selectModalOpen = true;
        this.openModal.emit();
    }
    clearSelection=()=>{
        this.selected=[];
    }
    createDataRow=(data)=>{
        return (
        <tr>
            <td><input type="checkbox" value={data.product} onChange={this.handleSelect}
            checked={this.selected.indexOf(data.product)>=0}/></td>
            <td><a href="#" 
                data-product={data.product}
                data-category={data.category}
                data-groupcode ={data.groupcode}
                data-productcode = {data.productcode}
                data-exchange={data.exchange}
                data-symbol={data.symbol}
                data-foi={data.foi}
                data-spread = {data.spread?"Yes":"No"}
                data-globextrad= {data.globextrad?"Yes":"No"}
                onClick={this.handleProductClick}>{data.product}</a></td>
            <td></td>
            <td>{data.exchange}</td>
            <td>{data.category}</td>
            <td>{data.symbol}</td>
            <td>{data.foi}</td>
        </tr>)
    }
    
    render(){
        return (
        <main>
            <app-backdrop open={this.data.length==0}>
                <div class="loaderwrap"><p class="loader">Loading</p></div>
            </app-backdrop>
            <app-control class="app-control"
            instrumType={this.instrumType}
            searchTerm ={this.searchTerm}
            selectedCats={this.category} 
            selectedExs={this.exchange}
            productLevel={this.productLevel}></app-control>
            <section class="app-content">
                <div>
                    <app-button type="highlight" onClick={this.addSelection} disabled={this.selected.length==0}>Add Selected and Continue</app-button>
                    <app-button type="cancel" onClick={this.clearSelection}>Clear All Selected</app-button>
                </div>
                <table>
                    <tr class="table-head">
                        <th></th>
                        <th>
                            <app-arrows text="Product Name" data-name="product" selected={this.criteria=="product"} direction={this.sortDir}
                            onClick={this.handleSortClick}></app-arrows>
                        </th>
                        <th>Availability</th>
                        <th>
                            <app-arrows text="Exchange" data-name="exchange" selected={this.criteria=="exchange"} direction={this.sortDir}
                            onClick={this.handleSortClick}></app-arrows>
                        </th>
                        <th>
                            <app-arrows text="Category" data-name="category" selected={this.criteria=="category"} direction={this.sortDir}
                            onClick={this.handleSortClick}></app-arrows>                
                        </th>
                        <th>
                            <app-arrows text="Symbol" data-name="symbol" selected={this.criteria=="symbol"} direction={this.sortDir}
                            onClick={this.handleSortClick}></app-arrows>                   
                        </th>
                        <th>
                            <app-arrows text="FOI" data-name="foi" selected={this.criteria=="foi"} direction={this.sortDir}
                            onClick={this.handleSortClick}></app-arrows>                  
                        </th>
                    </tr>
                {this.curPageData.map(this.createDataRow)}
                </table>
                <div>Showing {this.dataLength==0?0:(this.curPage-1)*this.nrowPage+1} to {this.curPage*this.nrowPage<this.dataLength?this.curPage*this.nrowPage:this.dataLength} of {this.dataLength} entries</div>
                <app-pagination class="pagination" maxSeq={5} nPage={Math.ceil(this.dataLength/this.nrowPage)} curPage={this.curPage}/>
            </section>
        <app-modal id="product-select" modal-title="Product Selection" open={this.selectModalOpen} confirmButton={true} confirmButtonText="Add to Cart">
            <p>You have selected {this.selected.length} product(s).</p>
            <p>Please choose the data type and range. They will be applied to all selected products.</p>
        </app-modal>
        <app-modal id="product-info" modal-title="Product Information" open={this.infoModalOpen} confirmButton={false}>
            <app-info-table data={this.infoData}></app-info-table>
        </app-modal>
        </main>);
    }
}
/*
interface ProductData {
    product:string;
    exchange:string;
    category:string;
    symbol:string;
    groupcode:string;
    productcode:string;
    foi:string;
    spread:boolean;
    globextrad:boolean;
}*/

