import { Component, State, Prop, Method, Listen } from '@stencil/core';
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
    @State() modalOpen: boolean=false;
    @State() infoData : any={};
    @State() searchTerm : string='';
    @State() instrumType:string[]=[];
    @State() category:string[]=[];
    @State() exchange:string[]=[];
    @State() curPageData :ProductData[] = [];
    @State() dataLength: number = this.data.length;

    @Listen('changePage')
    changePageHandler(event:CustomEvent){
        this.curPage = event.detail;
        this.updateShowedData();
    }
    @Listen('closeModal')
    closeModalHandler(event:CustomEvent){
        this.modalOpen = false;
    }
    @Listen('newSearch')
    newSearchHandler(event:CustomEvent){
        this.curPage = 1;
        if (event.detail.length>1) {
            this.searchTerm = event.detail;
        } else {
            this.searchTerm='';
        }
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
        var data,id;
        ({data,id} = event.detail);
        if (data=="") return;
        if (id=="category") {
            this.category = [...this.category,data];
        } else if (event.detail.id=="exchange") {
            this.exchange = [...this.exchange,data];
        }
        this.curPage = 1;
        this.updateShowedData();
    }
    @Listen('deleteSelect')
    handleDeleteSelect(event:CustomEvent) {
        var data,id;
        ({data,id} = event.detail);
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
    updateShowedData=()=>{
        var filteredData = this.data;
        if (this.searchTerm!=''||this.instrumType.length>0||this.category.length>0) {
            var target = RegExp(this.searchTerm,'i');
            filteredData = this.data.filter((row)=>{
                var term = target.test(row.product)||target.test(row.symbol);
                var instrum;
                var instrumSum= 0;
                var cat;
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
                return term&&instrum&&cat;
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
    componentWillLoad(){
        getData('https://cdn.glitch.com/1e8c939e-c923-420c-b9e8-e4fed617755f%2Fproductsheet.csv')
        .then((response)=>{
            csv({
                delimiter:';',
                trim:true
            }).fromString(response)
            .then(function(parsed){
                return parsed.map(function(row){
                    return {
                        product: row.PROD_NAME,
                        exchange:row.EXCH_CODE,
                        category:row.PROD_CATEGORY,
                        symbol:row.PROD_CODE,
                        foi:row.FOI,
                        spread:row.SPREAD_IND==1?true:false,
                        future:row.FOI=="FUT"?true:false,
                        option:row.FOI=="OPT"?true:false
                    }
                }).filter(function(row){
                    return row.product.length>0&&row.symbol!='null';
                })
            }).then((cleaned)=>{
                this.data = cleaned;
                this.updateShowedData();
            })
        }).catch(function(error){
            console.log(error);
        })
        /*this.data = [{
            product:'a',
            exchange:'a',
            category:'AGRICULTURE',
            symbol:'a',
            foi:'a',
            spread:false,
            future:true,
            option:false            
        },{
            product:'a',
            exchange:'a',
            category:'ENERGY',
            symbol:'a',
            foi:'a',
            spread:true,
            future:true,
            option:false            
        }];
        this.updateShowedData();*/       
    }
    handleProductClick = (evt)=>{
        var el = evt.srcElement;
        var data = {
            product:el.getAttribute('data-product'),
            exchange:el.getAttribute('data-exchange'),
            category:el.getAttribute('data-category'),
            symbol:el.getAttribute('data-symbol'),
            foi:el.getAttribute('data-foi')
        };
        this.modalOpen = true;
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
            this.selected = this.selected.slice(0,indx).concat(this.selected.slice(indx));
        }
    }
    
    createDataRow=(data)=>{
        return (
        <tr>
            <td><input type="checkbox" value={data.symbol} onChange={this.handleSelect}/></td>
            <td><a href="#" data-product={data.product} 
                data-exchange={data.exchange}
                data-category={data.category}
                data-symbol={data.symbol}
                data-foi={data.foi}
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
            </app-backdrop>
            <app-control class="app-control" selectedCats={this.category} selectedExs={this.exchange}></app-control>
            <section class="app-content">
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
                <div>Showing {(this.curPage-1)*this.nrowPage+1} to {this.curPage*this.nrowPage<this.dataLength?this.curPage*this.nrowPage:this.dataLength} of {this.dataLength} entries</div>
                <app-pagination class="pagination" maxSeq={5} nPage={Math.ceil(this.dataLength/this.nrowPage)} curPage={this.curPage}>
                </app-pagination>
            </section>
        <app-modal modal-title="Product Information" open={this.modalOpen} confirmButton={false}>
            <app-info-table data={this.infoData}></app-info-table>
        </app-modal>
        </main>);
    }
}

interface ProductData {
    product:string;
    exchange:string;
    category:string;
    symbol:string;
    foi:string;
    spread:boolean;
    future:boolean;
    option:boolean;
}

