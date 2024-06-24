export const data = [
  {
    table_group: {
      id: "table_group_1",
      name: "imp",
      tables: [
        {
          id: "table_group_1_table_1",
          name: "student_details",
          columns: [
            {
              column_id: "table_group_1_table_1_column_1_1",
              name: "age",
              column_data_type: "integer",
            },
            {
              column_id: "table_group_1_table_1_column_1_2",
              name: "student_id",
              column_data_type: "integer",
            },
            {
              column_id: "table_group_1_table_1_column_1_3",
              name: "name",
              column_data_type: "string",
            },
          ],
        },
        {
          id: "table_group_1_table_2",
          name: "department_info",
          columns: [
            {
              column_id: "table_group_1_table_2_column_2_1",
              name: "department_id",
              column_data_type: "integer",
            },
            {
              column_id: "table_group_1_table_2_column_2_2",
              name: "department_email",
              column_data_type: "string",
            },
            {
              column_id: "table_group_1_table_2_column_2_3",
              name: "student_id",
              column_data_type: "integer",
            },
          ],
        },
      ],
    },
  },
  {
    table_group: {
      id: "table_group_2",
      name: "patient",
      tables: [
        {
          id: "table_group_2_table_1",
          name: "personal_info",
          columns: [
            {
              column_id: "table_group_2_table_1_column_2_1",
              name: "patient_age",
              column_data_type: "integer",
            },
            {
              column_id: "table_group_2_table_1_column_2_2",
              name: "patient_id",
              column_data_type: "integer",
            },
            {
              column_id: "table_group_2_table_1_column_2_3",
              name: "patient_gender",
              column_data_type: "string",
            },
          ],
        },
      ],
    },
  },
];
