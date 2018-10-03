export type FormElementEventCallbackType = (
  event: React.FormEvent<HTMLElement>
) => void;

export interface FormElementAttributeType {
  label: string;
  id: string;
  name: string;
}
