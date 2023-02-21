import { ProTableColumnProps } from '.';

export function calculateColumnsScrollWidth<T extends object>(
  columns: ProTableColumnProps<T>[],
  baseWidth: number
): number {
  return columns.reduce((w, column) => {
    const cw = typeof column.width === 'number' ? column.width : baseWidth;
    return w + cw;
  }, 0);
}
