import * as React from 'react';
import * as info from '../../../profiles.json';
import { connect } from 'react-redux';
import { TableState } from '../../reducers/table';

/*TODO 
1. 
*/
// пропсы из реакта
type Props = {};
// пропсы из стора
type StoreProps = TableState;
// диспатч из стора
type StoreDispatch = { onTableUpdate?: (table: TableState) => void; };
// наш стейт
type State = {};
type Profile = { [key: string]: string | number | boolean; };

const PROFILES: Array<Profile> = info;
const ALL_COLUMNS = PROFILES.reduce((acc, curr) => ({ ...acc, ...curr }), {});
const COLUMNS = Object.keys(ALL_COLUMNS);
const SORT_ABC = field => (a, b) => a[field] > b[field] ? -1 : 1;

// селект из стора
const mapStateToProps = (state): StoreProps => ({
    column: state.table.column,
    sort: state.table.sort,
    reverse: state.table.reverse
});

// диспатч в стор
const mapDispatchToProps = dispatch => ({
    onTableUpdate: (table) => dispatch({ type: 'TABLE/SET', value: table })
});

class Table extends React.Component<Props & StoreProps & StoreDispatch, State> {
    getSortedData = (): Array<Profile> => {
        const { column, sort, reverse } = this.props;

        switch (sort) {
            case 'abc':
                const sorted = PROFILES.sort(SORT_ABC(column));

                return reverse ? sorted.reverse() : sorted;

            default:
                return PROFILES;
        }
    };

    renderData() {
        return this.getSortedData().map(profile => {
            const id = btoa(JSON.stringify(profile));

            return (
                <tr key={id}>
                    {Object.values(profile).map(value => (
                        <td key={`${id}-${value}`}>{value}</td>
                    ))}
                </tr>
            )
        })
    }

    onColumnClick = column => () => {
        const { reverse, onTableUpdate } = this.props;

        onTableUpdate({ column, sort: 'abc', reverse: !Boolean(reverse) });
    }

    render() {
        return (
            <div className="table-wrapper">
                
                <h1 className="title">Amazing Hiring Test Table</h1>
                <table className="table-content">
                    <tbody>
                        <tr>
                            {COLUMNS.map(column => (
                                <th key={column} onClick={this.onColumnClick(column)}>
                                    {column.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                        {this.renderData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
