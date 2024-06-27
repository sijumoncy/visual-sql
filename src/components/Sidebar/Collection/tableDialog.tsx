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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { CircleX, SquarePlus } from "lucide-react";

interface ITableDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ITableColumn {
  [key: string]: string;
}

interface ITableFormValues {
  tableName: string;
  columns: ITableColumn[];
}

const COLUMN_CONFIG = [
  { name: "columnName", label: "Column Name", type: "text" },
  { name: "dataType", label: "Data Type", type: "text" },
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITableFormValues>({
    defaultValues: {
      columns: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onSubmit: SubmitHandler<ITableFormValues> = (data) => {
    console.log("form data ===> ", data);
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
              <div className="overflow-y-scroll max-h-72">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-2 items-center "
                  >
                    {COLUMN_CONFIG.map((column, colIndex) => (
                      <div key={colIndex} className="">
                        <Label htmlFor={`columns.${index}.${column.name}`}>
                          {column.label}
                        </Label>
                        <Input
                          {...register(
                            `columns.${index}.${column.name}` as const,
                            {
                              required: `${column.label} is required`,
                            }
                          )}
                        />
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
