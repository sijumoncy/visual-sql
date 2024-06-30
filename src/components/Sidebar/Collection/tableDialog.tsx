import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog/dialog";

import { Button } from "@/components/ui/button/button";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { CircleX, SquarePlus } from "lucide-react";
import { ITable, TableColumnDataTypesEnum } from "@/interface/tableData";
import { CustomCombobox } from "@/components/CustomCombobox/custom-combobox";
import { collectionAtom } from "@/store/atom/collectionAtom";
import { useRecoilState } from "recoil";
import { Checkbox } from "@/components/ui/checkbox/checkbox";

interface ITableDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ITableColumn {
  [key: string]: string | boolean;
}

interface ITableFormValues {
  tableName: string;
  columns: ITableColumn[];
}

const COLUMN_CONFIG = [
  { name: "columnName", label: "Column Name", type: "text" },
  {
    name: "dataType",
    label: "Data Type",
    type: "select",
    options: Object.values(TableColumnDataTypesEnum),
  },
  { name: "primaryKey", label: "Is PK", type: "checkbox" },
];

const ErrorText = ({ error, text }: { text: string; error: boolean }) => {
  return (
    <span
      className={`text-destructive text-xs ${
        error ? "opacity-1" : "opacity-0"
      }`}
    >
      {text}
    </span>
  );
};

function TableDialog({ open, setOpen }: ITableDialogProps) {
  const [collection, setCollection] = useRecoilState(collectionAtom);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ITableFormValues>({
    defaultValues: {
      columns: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  /**
   * on submit table creation form
   */
  const onSubmit: SubmitHandler<ITableFormValues> = (data) => {
    if (collection) {
      const table_Id = `${collection.collectionId}_${data.tableName}`;
      // Need to check same table exist
      console.log({ collection });
      const existingTable = collection.tables.filter(
        (table) => table.name === data.tableName
      );
      if (existingTable.length > 0) {
        alert(`Table ${data.tableName} already exist`);
        return;
      }

      /**
       * if no PKColumns => error need at least one PK in table
       * If more than 1 key. Throw error only allow one key
       * INFO : Currently not handling multi column PK
       */
      const PKColumns = data.columns.filter(
        (col) => col["primaryKey"] === true
      );
      if (PKColumns.length === 0) {
        alert("No Primary Key field is selected");
      } else if (PKColumns.length > 1) {
        alert("More than one field selected as Primary Key");
      } else {
        const table: ITable = {
          id: table_Id,
          name: data.tableName.replace(/\s+/, "_"),
          columns: data.columns.map((col) => ({
            // column name will be string always
            column_id: `${table_Id}_${(col["columnName"] as string).replace(
              /\s+/,
              "_"
            )}`,
            name: (col["columnName"] as string).replace(/\s+/, "_"),
            column_data_type: col["dataType"] as TableColumnDataTypesEnum,
            isPrimaryKey: col["primaryKey"],
          })),
        };
        console.log("form data ===> ", { data, table });

        setCollection((prev) =>
          prev?.collectionId
            ? {
                collectionId: prev?.collectionId,
                collectionName: prev?.collectionName,
                tables: [...prev.tables, table],
              }
            : null
        );

        setOpen(false);
        reset();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Table</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-h-56 max-h-[500px]"
          >
            <div className="">
              <Label htmlFor="tableName">Table Name</Label>
              <Input
                {...register("tableName", {
                  required: "Table Name is required",
                  minLength: { value: 2, message: "at least 2 characters" },
                })}
              />
              <ErrorText
                error={!!errors.tableName}
                text={errors.tableName?.message || ""}
              />
            </div>

            <div className="mt-3">
              <div className="mb-2 flex justify-between ">
                <Label className="text-md font-semibold ">Columns</Label>
                <button
                  className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  title="Add New Column"
                >
                  <SquarePlus className="" onClick={() => append({})} />
                </button>
              </div>
              <div className="overflow-y-scroll max-h-80">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-center px-1">
                    {COLUMN_CONFIG.map((column, colIndex) => (
                      <div
                        key={colIndex}
                        className="flex flex-col justify-around gap-2"
                      >
                        <Label htmlFor={`columns.${index}.${column.name}`}>
                          {column.label}
                        </Label>
                        {column.type === "text" && (
                          <Input
                            {...register(
                              `columns.${index}.${column.name}` as const,
                              {
                                required: `${column.label} is required`,
                              }
                            )}
                          />
                        )}
                        {column.type === "select" && column?.options && (
                          <Controller
                            name={`columns.${index}.${column.name}` as const}
                            control={control}
                            defaultValue={column.options[0]}
                            rules={{ required: `${column.label} is required` }}
                            render={({ field }) => (
                              <CustomCombobox
                                options={column.options.map((option) => ({
                                  value: option,
                                  label: option,
                                }))}
                                selectedValue={field.value as string}
                                setSelectedValue={field.onChange}
                              />
                            )}
                          />
                        )}
                        {column.type === "checkbox" && (
                          <div className="w-10 ">
                            <Controller
                              name={`columns.${index}.${column.name}` as const}
                              control={control}
                              defaultValue={false}
                              render={({ field: { onChange, value } }) => (
                                <Input
                                  type="checkbox"
                                  className="w-5 h-5 accent-black"
                                  checked={value as boolean}
                                  onChange={onChange}
                                />
                              )}
                            />
                          </div>
                        )}
                        <ErrorText
                          error={!!errors.columns?.[index]?.[column.name]}
                          text={
                            (errors.columns &&
                              errors.columns[index]?.[column.name]?.message) ||
                            "error"
                          }
                        />
                      </div>
                    ))}

                    <button type="button" onClick={() => remove(index)}>
                      <CircleX className="hover:text-destructive" size={22} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-5">
              <Button type="submit" className="bg-[#242424]">
                create
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TableDialog;
