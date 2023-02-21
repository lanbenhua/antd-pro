import { ProTableColumnProps } from '.';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../constant';

export const CHANGE_PAGINATION = 'change-pagination';
export const CHANGE_COLUMN_FILTER = 'change-column-filter';
export const CHANGE_TABLE_FILTERS = 'change-table-filters';
export const CHANGE_TABLE_SORTER = 'change-table-sorter';

export type ActionPayload<T> = {
  type: string;
  payload: T;
};

export function createAction<T>(action: string, payload: T): ActionPayload<T> {
  return {
    type: action,
    payload,
  };
}

export type ColumnFilter<T extends object> = {
  columns?: ProTableColumnProps<T>[];
  all?: boolean;
  indeterminate?: boolean;
  keys?: string[];
};

export type Store<T extends object> = {
  pagination: {
    page?: number;
    size?: number;
    total?: number;
  };
  columnFilter: ColumnFilter<T>;
};

/* eslint @typescript-eslint/no-explicit-any: off */
export const default_store: Store<any> = {
  pagination: {
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    total: 0,
  },
  columnFilter: {
    all: true,
    indeterminate: false,
    keys: [],
  },
};

export const createDefaultStore = <T extends object>(
  columns?: ProTableColumnProps<T>[]
): Store<T> => {
  return {
    ...default_store,
    columnFilter: {
      all: true,
      indeterminate: false,
      ...default_store.columnFilter,
      // columns:
      keys: columns
        ?.filter(column => !column.hideFilterable)
        ?.map(column => (column.key || column.dataIndex) as string),
    },
  };
};

export const reducer = function<T extends object>(
  state: Store<T>,
  /* eslint @typescript-eslint/no-explicit-any: off */
  action: ActionPayload<any>
): Store<T> {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload,
        },
      };
    case CHANGE_COLUMN_FILTER:
      return {
        ...state,
        columnFilter: payload,
      };
    default:
      return {
        ...default_store,
        ...state,
      };
  }
};
