import * as React from 'react';
import * as info from '../../../profiles.json';


type Props = {
}

type States = {
    data: any
}

export class Table extends React.Component<Props,States>{
    constructor(props:Props) {
        super(props);
        
        this.state = {
            data: info,

        }
    }
    renderTableData(){
        
        return this.state.data.map((field, index)=>{
            const {Name,Email,Phone,Company} = field;

            return(
                <tr key={index}>
                    <td>{Name}</td>
                    <td>{Email}</td>
                    <td>{Phone}</td>
                    <td>{Company}</td>
                </tr>
            )
        })
    }

    renderTableHeader(){
        let headerKeys = Object.keys(this.state.data[0]);
        return headerKeys.map((value,index)=>{
            return <th key={index}>{value.toUpperCase()}</th>
        })
    }
    render(){
        return(
            <div className="table-wrapper">
                <h1 className="title">Amazing Hiring Test Table</h1>
                <table className="table-content">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}