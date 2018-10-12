import { Component, State, Prop, Method, Listen } from '@stencil/core';

@Component({
  tag: 'app-table',
  styleUrl : 'app-table.css',
  shadow:true
})

export class AppTable {
    @Prop() nrowPage: number;
    @State() data: ProductData[] = [];
    @State() curPageData :ProductData[] = [];
    @State() sortDir: string = '';
    @State() criteria:string = '';
    @State() selected: string[]=[];
    @State() curPage: number=1;
    @State() modalOpen: boolean=false;
    @State() infoData : any={};

    @Listen('changePage')
    changePageHandler(event:CustomEvent){
        this.curPage = event.detail;
    }
    @Listen('closeModal')
    closeModalHandler(event:CustomEvent){
        this.modalOpen = false;
    }
    @Method()
    bindData(data){
        this.data = data;
    }
    componentDidUpdate() {
        this.curPageData = this.data.slice((this.curPage-1)*this.nrowPage,this.curPage*this.nrowPage);
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
        this.data = this.data.slice().sort((a,b)=>{
            if (a[this.criteria]<b[this.criteria]) {
                return this.sortDir=='desc'?-1:1;
            } else if (a[this.criteria]>b[this.criteria]){
                return this.sortDir=='desc'?1:-1;
            } else {
                return 0;
            }
        });
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
        <div>
        <table>
            <tr>
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
        <div>Showing {(this.curPage-1)*this.nrowPage+1} to {this.curPage*this.nrowPage<this.data.length?this.curPage*this.nrowPage:this.data.length} of {this.data.length} entries</div>
        <app-pagination class="pagination" max-seq={5} n-page={Math.ceil(this.data.length/this.nrowPage)}></app-pagination>
        <app-modal modal-title="Product Information" open={this.modalOpen} confirmButton={false}>
            <app-info-table data={this.infoData}></app-info-table>
        </app-modal>
        </div>);
    }
}

interface ProductData {
    product:string;
    exchange:string;
    category:string;
    symbol:string;
    foi:string
}

