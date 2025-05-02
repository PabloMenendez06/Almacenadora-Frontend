import { useState } from "react";
import { Input } from '../Input';
import { userSchema } from '../../shared/validators'; 

const inputs = [
  {
    field: 'username',
    label: 'Username',
    type: 'text'
  },
  {
    field: 'avatarUrl',
    label: 'Avatar Url',
    type: 'text'
  },
];

export const ChannelSettings = ({ settings, saveSettings }) => {
  const [formState, setFormState] = useState({
    username: {
      isValid: true,
      showError: false,
      value: settings.username
    },
    avatarUrl: {
      isValid: true,
      showError: false,
      value: settings.avatarUrl
    }
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }));
  };

  const handleInputValidationOnBlur = async (value, field) => {
    try {
      await userSchema.validateAt(field, { [field]: value });
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isValid: true,
          showError: false
        }
      }));
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isValid: false,
          showError: true
        }
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const values = {
      username: formState.username.value,
      avatarUrl: formState.avatarUrl.value,
    };

    try {
      await userSchema.validate(values, { abortEarly: false });
      saveSettings(values);
    } catch (error) {
      const newFormState = { ...formState };

      error.inner.forEach((err) => {
        const field = err.path;
        newFormState[field].isValid = false;
        newFormState[field].showError = true;
      });

      setFormState(newFormState);
    }
  };

  const isSubmitButtonDisabled = !formState.username.isValid || !formState.avatarUrl.isValid;

  return (
    <form className="settings-form" onSubmit={handleFormSubmit}>
      {inputs.map((input) => (
        <Input
          key={input.field}
          field={input.field}
          label={input.label}
          value={formState[input.field].value}
          onChangeHandler={handleInputValueChange}
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState[input.field].showError}
          validationMessage={!formState[input.field].isValid ? 'Campo inválido' : ''}
          type={input.type}
          textarea={input.textarea}
        />
      ))}
      <button type="submit" disabled={isSubmitButtonDisabled}>
        Update
      </button>
    </form>
  );
};
