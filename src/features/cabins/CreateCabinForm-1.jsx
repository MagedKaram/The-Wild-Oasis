import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRowEle from "../../ui/FormRowEle";

import { createCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { isPending: isCreated, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      reset();
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRowEle label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="on"
          disabled={isCreated}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRowEle>
      <FormRowEle label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreated}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Minimum capacity is 1" },
          })}
        />
      </FormRowEle>

      <FormRowEle label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreated}
          {...register("regularPrice", {
            required: "Regular price is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Price must be non-negative",
            },
          })}
        />
      </FormRowEle>

      <FormRowEle label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreated}
          defaultValue={0}
          {...register("discount", {
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount must be less than regular price",
          })}
        />
      </FormRowEle>

      <FormRowEle
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          disabled={isCreated}
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRowEle>

      <FormRowEle label="Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Image is required",
          })}
          disabled={isCreated}
        />
      </FormRowEle>

      <FormRowEle>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isCreated}>Add cabin</Button>
      </FormRowEle>
    </Form>
  );
}

export default CreateCabinForm;
