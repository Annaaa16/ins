// types
import { FieldError } from '~/types/generated';

const toErrorMap = (errors: FieldError[]): { field: any; message: string } => ({
  field: errors[0].field,
  message: errors[0].message,
});

export default toErrorMap;
