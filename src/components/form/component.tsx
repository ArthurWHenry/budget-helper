import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
