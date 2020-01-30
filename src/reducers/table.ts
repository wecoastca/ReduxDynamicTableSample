import { Reducer } from "redux"

export type TableState = {
    column?: string;
    sort?: 'abc';
    reverse?: boolean;
};

// TODO: добавить загрузки из и в localstorage
const TABLE_STORAGE_KEY = 'table_state';
const getTableFromStorage = () => JSON.parse(localStorage.getItem(TABLE_STORAGE_KEY));
const setTableToStorage = (table) => localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(table));

const initialState: TableState = getTableFromStorage() || {};

const table: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TABLE/SET':
            const table = {...state, ...action.value };
            
            setTableToStorage(table);

            return table;

        default:
            return state;
    }
}

export default table;