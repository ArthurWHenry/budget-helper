import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

type FormComponentProps = {
  classes?: string;
  handleSubmit: any;
  children: any;
  options?: any;
  schema?: any;
};

const Form: React.FC<FormComponentProps> = ({
  classes,
  handleSubmit,
  options,
  schema,
  children,
}: FormComponentProps): JSX.Element => {
  const methods = useForm({
    ...options,
    resolver: schema && yupResolver(schema),
  });
  useEffect(() => {
    if (Object.keys(methods.formState.errors).length > 0) {
      Object.values(methods.formState.errors).map((error) => {
        if (error && error.message) toast.error(error.message as string);
      });
    }
  }, [methods.formState.errors]);

  return (
    <form
      className={classes}
      onSubmit={methods.handleSubmit(handleSubmit)}
      noValidate
    >
      {children(methods)}
    </form>
  );
};

export default Form;
