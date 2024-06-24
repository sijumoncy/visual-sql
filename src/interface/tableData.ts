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
