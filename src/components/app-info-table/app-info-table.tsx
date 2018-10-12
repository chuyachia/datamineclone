import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-info-table'
})

export class AppInfoTable {
    @Prop() data:any;
    
    render(){
        return(
            <table>
            <tr>
            <td>Product</td>
            <td>{this.data.product}</td>
            </tr>
            <tr>
            <td>Dataset</td>
            <td>{this.data.dataset}</td>
            </tr>
            <tr>
            <td>Category</td>
            <td>{this.data.category}</td>
            </tr>
            <tr>
            <td>Group code</td>
            <td>{this.data.groupcode}</td>
            </tr>
            <tr>
            <td>Product code</td>
            <td>{this.data.productcode}</td>
            </tr>
            <tr>
            <td>Exchange</td>
            <td>{this.data.exchange}</td>
            </tr> 
            <tr>
            <td>Symbol</td>
            <td>{this.data.symbol}</td>
            </tr>
            <tr>
            <td>FOI</td>
            <td>{this.data.foi}</td>
            </tr>
            <tr>
            <td>Spread</td>
            <td>{this.data.spread}</td>
            </tr> 
            <tr>
            <td>Floor traded</td>
            <td>{this.data.floor}</td>
            </tr>
            <tr>
            <td>Globex traded</td>
            <td>{this.data.globex}</td>
            </tr> 
            <tr>
            <td>Tier</td>
            <td>{this.data.tier}</td>
            </tr>
            <tr>
            <td>File first seen on</td>
            <td>{this.data.firstseen}</td>
            </tr> 
            <tr>
            <td>File last seen on</td>
            <td>{this.data.lastseen}</td>
            </tr>
            <tr>
            <td>Files count</td>
            <td>{this.data.count}</td>
            </tr>
            </table>
            )
    }
}