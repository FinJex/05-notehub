import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { createNote } from "../../services/noteService";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface NoteFormValues {
    title: string,
    content: string,
    tag: string;
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "",
}

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({
  onClose,
}: NoteFormProps) {
    const fieldId = useId();

    const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Too long"),
  tag: Yup.string()
   .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag"
    )
    .required("Tag is required")
});
    
  const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: createNote,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["notes"],
    });

    onClose();
  },
});
const handleSubmit = (
  values: NoteFormValues,
  actions: FormikHelpers<NoteFormValues>
) => {
  mutation.mutate(values);

  actions.resetForm();
};
    return (
        <Formik initialValues={ initialValues } validationSchema={OrderFormSchema} onSubmit={handleSubmit}>
        <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-title`}>Title</label>
    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-content`}>Content</label>
    <Field
      as="textarea"
      id={`${fieldId}-content`}
      name="content"
      rows={8}
      className={css.textarea}
    />
    <ErrorMessage name="content" component="span" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-tag`}>Tag</label>
    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="tag" component="span" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled={mutation.isPending}
    >
      Create note
    </button>
  </div>
</Form>
</Formik>
    );
}