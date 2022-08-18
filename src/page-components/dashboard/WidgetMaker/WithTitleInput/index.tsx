import { useContext } from 'react';
import { TextInput } from 'shared-components/TextInput';
import { WidgetMakerContext } from '../context';
import { AddNameWrapper } from './styled';

interface withTitleInputProps {
  placeholder?: string;
  children?: React.ReactNode;
}

export const WithTitleInput: React.FC<withTitleInputProps> = ({ placeholder, children }) => {
  const { state, actions } = useContext(WidgetMakerContext);
  const normalizedPlaceholder = placeholder ? placeholder : 'My Custom Widget'
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedConfig = {
      ...state.configuration,
      title: e.currentTarget.value,
    };

    actions.updateConfig(updatedConfig);
  };

  return (
    <>
      <AddNameWrapper>
        <label htmlFor="widget-name">Add a name for this widget:</label>
        <TextInput inputId="widget-name" onChange={onChange} placeholder={normalizedPlaceholder} />
      </AddNameWrapper>
      { children }
    </>
  )
}