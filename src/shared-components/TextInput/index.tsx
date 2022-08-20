import { forwardRef } from 'react';
import { Input, TextInputWrapper } from './styled';

export interface TextInputProps {
  label?: string;
  value?: string;
  inputId?: string;
  size?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ onChange = () => {}, label, value, inputId, size, placeholder, type = 'text' }, ref) => {
    return (
      <TextInputWrapper>
        <Input ref={ref} placeholder={placeholder} id={inputId} value={value} type={type} onChange={onChange} fontSize={size}/>
      </TextInputWrapper>
    )
  }
);
