import { Component, Prop } from '@stencil/core';
import {ProductData} from '../../datatypes/datatypes';
@Component({
  tag: 'app-info-table'
})

export class AppInfoTable {
    @Prop() data:ProductData;
    
    render(){
        return(
            <table>
            <tr>
            <td>Name</td>
            <td>{this.data.product}</td>
            </tr>
            <tr>
            <td>Dataset</td>
            <td></td>
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
            <td></td>
            </tr>
            <tr>
            <td>Globex traded</td>
            <td>{this.data.globextrad}</td>
            </tr> 
            <tr>
            <td>Tier</td>
            <td></td>
            </tr>
            <tr>
            <td>File first seen on</td>
            <td></td>
            </tr> 
            <tr>
            <td>File last seen on</td>
            <td></td>
            </tr>
            <tr>
            <td>Files count</td>
            <td></td>
            </tr>
            </table>
            )
    }
}