import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/button/input/input";
import { CircleX, SquarePlus } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface ICreateCollectionProps {
  handleCreateCollection: (collectionName: string) => void;
  disableCreation: boolean;
}

type IFormInputs = {
  collectionName: string;
};

function CreateCollection({
  handleCreateCollection,
  disableCreation,
}: ICreateCollectionProps) {
  const [showCollectionForm, setShowCollectionForm] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    control,
    reset,
  } = useForm<IFormInputs>();

  const closeForm = () => {
    setShowCollectionForm(false);
    clearErrors();
    reset();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    handleCreateCollection(data.collectionName);
    closeForm();
  };

  return (
    <div>
      <div className="flex justify-between px-1">
        <p>Collections</p>
        <button
          title="Create a table collection"
          className={`${
            disableCreation
              ? "pointer-events-none text-muted-foreground"
              : "text-gray-700 hover:text-gray-900 cursor-pointer"
          }`}
        >
          {showCollectionForm ? (
            <CircleX className=" " onClick={closeForm} />
          ) : (
            <SquarePlus
              className=""
              onClick={() => setShowCollectionForm(true)}
            />
          )}
        </button>
      </div>

      {/* create collection form */}
      {showCollectionForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full max-w-sm items-center space-x-2 my-5"
        >
          <Controller
            name="collectionName"
            control={control}
            defaultValue=""
            rules={{
              required: "Name is Required",
              minLength: { value: 2, message: "at least 2 characters" },
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <Input {...field} type="text" placeholder="collection name" />
                {errors.collectionName && (
                  <p className="text-destructive text-sm">
                    {errors.collectionName.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className="w-full flex gap-2 justify-end pr-2">
            <Button type="submit" className="bg-[#242424]">
              create
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateCollection;
