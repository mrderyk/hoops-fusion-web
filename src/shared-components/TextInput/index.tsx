import { Input, TextInputWrapper } from "./styled"

export interface TextInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputId?: string;
  size?: string;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ onChange, value, inputId, size, placeholder }) => {
  return (
    <TextInputWrapper>
      <Input placeholder={placeholder} id={inputId} value={value} type="text" onChange={onChange} fontSize={size}/>
    </TextInputWrapper>
  )
};
