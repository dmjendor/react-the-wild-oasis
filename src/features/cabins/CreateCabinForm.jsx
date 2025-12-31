import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { isEditing, editCabin } = useEditCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const isPending = isEditing || isCreating;
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, editId },
        { onSuccess: () => reset() }
      );
    } else {
      createCabin({ ...data, image }, { onSuccess: () => reset() });
    }
  }

  const { errors } = formState;

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Enter a cabin name." })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Enter a maximum capacity.",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Enter a price.",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Enter a discount amount or 0",
            validate: (value) => {
              if (value >= getValues().regularPrice) {
                return "Discount should be less than the regular price.";
              }
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Cabin Description"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Enter a description.",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Cabin Image">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isPending}
          {...register("image", {
            required: isEditSession ? false : "Select an image.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditSession ? "Edit" : "Create New"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
