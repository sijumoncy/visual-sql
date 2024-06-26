export type ColumDataTypes = "integrer" | "string";

export interface IColumn {
  column_id: string;
  name: string;
  column_data_type: ColumDataTypes;
}

export interface ITable {
  id: string;
  name: string;
  columns: IColumn[];
}

export interface ITableGroup {
  id: string;
  name: string;
  tables: ITable[];
}

export enum DragTypeEnum {
  TABLE_NODE = "drag type id sidebar table node",
  TABLE_COLUMN = "drag type id column drag",
  DRAGGED_TABLE_DATA = "key for drag event data transfer",
  DRAGGED_TABLE_COLUMN="key for drag column event data transfer"
}

export enum CustomNodeTypes {
  TABLE_NODE = "customTableNode",
}

export interface ICustomTableNodeData {
  name: string;
  columns: IColumn[];
  type: DragTypeEnum;
}
