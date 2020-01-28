import * as React from 'react';
import * as info from '../../../profiles.json';


type Props = {
}

type States = {
    data: any
}

export class Table extends React.Component<Props, States>{
    constructor(props: Props) {
        super(props);

        this.state = {
            data: info,

        }
    }
    renderTableData() {

        return this.state.data.map((field, index) => {
            let columns = Object.keys(field);

            return (
                <tr key={index}>
                    {columns.map((value, i) => {
                        return <td key={i}>{field[columns[i]]}</td>
                    })}
                </tr>
            )
        })
    }

    renderTableHeader() {
        let headerKeys = Object.keys(this.state.data[0]);
        return headerKeys.map((value, index) => {
            return <th key={index}>{value.toUpperCase()}</th>
        })
    }
    render() {
        return (
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