import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'app-table'
})

export class AppTable {
    @State() data: ProductData[] = [];
    @State() sortDir: string = '';
    @State() criteria:string = '';
    @Method()
    bindData(data){
        this.data = data;
    }
    
    createSortFunction(criteria) {
        return function(a,b){
            if (a[criteria]<b[criteria]) {
                return this.sortDir=='desc'?-1:1;
            } else if (a[criteria]>b[criteria]){
                return this.sortDir=='desc'?1:-1;
            } else {
                return 0;
            }
        }
    }
    
    sortByProductName(){
        var comparefunc = this.createSortFunction('productName');
        this.data = this.data.slice().sort(comparefunc);
    }
    handleClick=(evt)=>{
        this.criteria = evt.srcElement.getAttribute('data-name');
        this.sortDir = this.sortDir=='desc'?'asc':'desc';
    }
    
    createDataRow(data){
        return (
        <tr>
            <td></td>
            <td>{data.productName}</td>
            <td></td>
            <td>{data.exchange}</td>
            <td>{data.category}</td>
            <td>{data.symbol}</td>
            <td>{data.foi}</td>
        </tr>)
    }
    
    render(){
        return (
        <table>
            <tr>
                <th></th>
                <th>
                    <app-arrows text="Product Name" data-name="product" selected={this.criteria=="product"} direction={this.sortDir}
                    onClick={this.handleClick}></app-arrows>
                </th>
                <th>Availability</th>
                <th>
                    <app-arrows text="Exchange" data-name="exchange" selected={this.criteria=="exchange"} direction={this.sortDir}
                    onClick={this.handleClick}></app-arrows>
                </th>
                <th>
                    <app-arrows text="Category" data-name="category" selected={this.criteria=="category"} direction={this.sortDir}
                    onClick={this.handleClick}></app-arrows>                
                </th>
                <th>
                    <app-arrows text="Symbol" data-name="symbol" selected={this.criteria=="symbol"} direction={this.sortDir}
                    onClick={this.handleClick}></app-arrows>                   
                </th>
                <th>
                    <app-arrows text="FOI" data-name="foi" selected={this.criteria=="foi"} direction={this.sortDir}
                    onClick={this.handleClick}></app-arrows>                  
                </th>
            </tr>
        {this.data.map(this.createDataRow)}
        </table>);
    }
}

interface ProductData {
    productName:string;
    exchange:string;
    category:string;
    symbole:string;
    foi:string
}

