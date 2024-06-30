import { Edge } from "reactflow";

export interface IColumn {
  column_id: string;
  name: string;
  column_data_type: TableColumnDataTypesEnum;
  isPrimaryKey?: boolean;
}

export interface ICollection {
  collectionId: string;
  collectionName: string;
  tables: ITable[];
}

export interface ITable {
  id: string;
  name: string;
  columns: IColumn[];
}

// export interface ITableGroup {
//   id: string;
//   name: string;
//   tables: ITable[];
// }

export enum DragTypeEnum {
  TABLE_NODE = "drag type id sidebar table node",
  TABLE_COLUMN = "drag type id column drag",
  DRAGGED_TABLE_DATA = "key for drag event data transfer",
  DRAGGED_TABLE_COLUMN = "key for drag column event data transfer",
}

export enum CustomNodeTypes {
  TABLE_NODE = "customTableNode",
}

export interface ICustomTableNodeData {
  name: string;
  columns: IColumn[];
  type: DragTypeEnum;
}

export type ICustomEdgeData = Edge & {
  data: IColumn;
};

export enum TableColumnDataTypesEnum {
  Integer = "INTEGER",
  SmallInt = "SMALLINT",
  BigInt = "BIGINT",
  Decimal = "DECIMAL",
  Numeric = "NUMERIC",
  Float = "FLOAT",
  Real = "REAL",
  DoublePrecision = "DOUBLE PRECISION",
  Char = "CHAR",
  VarChar = "VARCHAR",
  Text = "TEXT",
  Date = "DATE",
  Time = "TIME",
  Timestamp = "TIMESTAMP",
  Boolean = "BOOLEAN",
  Blob = "BLOB",
  Clob = "CLOB",
}
