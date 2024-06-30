import {
  ICustomEdgeData,
  ICustomTableNodeData,
  TableColumnDataTypesEnum,
} from "@/interface/tableData";
import { useEffect, useState } from "react";
import { Edge, Node } from "reactflow";

/**
 * as of now most of the fields are considered as simple data type of SQL
 * so mapping multiple types to a simple general type
 * TODO : Add column in table creation to provide other values of column
 * TODO : Then change function to support all data types
 */
function mapToSQLType(columnType: TableColumnDataTypesEnum) {
  switch (columnType) {
    case TableColumnDataTypesEnum.VarChar:
    case TableColumnDataTypesEnum.Text:
      return "VARCHAR(255)";

    case TableColumnDataTypesEnum.Integer:
    case TableColumnDataTypesEnum.BigInt:
    case TableColumnDataTypesEnum.Numeric:
    case TableColumnDataTypesEnum.SmallInt:
      return "INTEGER";

    case TableColumnDataTypesEnum.Boolean:
      return "BOOLEAN";
    default:
      return "VARCHAR(255)";
  }
}

export function useGenerateSql(
  nodes: Node<ICustomTableNodeData>[],
  edges: Edge[]
) {
  const [query, setQuery] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  async function generate() {
    // extract and generate table creation queries
    nodes.forEach((node) => {
      const tableName = node.data.name;
      const columns = node.data.columns;

      let createTableQuery = `CREATE TABLE ${tableName} (`;
      columns.forEach((column, index) => {
        const { name: columnName, column_data_type, isPrimaryKey } = column;
        const mappedSQLType = mapToSQLType(column_data_type);
        createTableQuery += `${columnName} ${mappedSQLType}`;
        // Need to add PRIMARY KEY field
        if (isPrimaryKey) {
          createTableQuery += " PRIMARY KEY";
        }

        if (index < columns.length - 1) {
          createTableQuery += ", ";
        }
      });
      createTableQuery += ");";
      setQuery((prev) => [...prev, createTableQuery]);
    });

    // Generate relations from edges
    edges.forEach((edge) => {
      const { sourceNode, targetNode }: Edge<ICustomEdgeData> = edge;

      const sourceTableName = (sourceNode as Node<ICustomTableNodeData>).data
        .name;
      const targetTableName = (targetNode as Node<ICustomTableNodeData>).data
        .name;
      // ADD CONSTRAINT ${edge.id}_FK
      // TODO : Need to change using DATE for Id creation
      const alterTableSQL = `ALTER TABLE ${targetTableName}
                            ADD CONSTRAINT ${targetTableName}_${sourceTableName}_${edge.data.name}FK
                             FOREIGN KEY (${edge.data.name}) REFERENCES ${sourceTableName}(${edge.data.name});`;

      setQuery((prev) => [...prev, alterTableSQL]);
    });
  }

  useEffect(() => {
    (async () => {
      if (!generating) {
        setQuery([]);
        setGenerating(true);
        console.log("call in use Effect ===>");
        generate();
        setGenerating(false);
      }
    })();
  }, [nodes, edges]);

  return { query, generating };
}
