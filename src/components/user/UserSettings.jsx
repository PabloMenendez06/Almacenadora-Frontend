import { useState } from "react";
import { Input } from '../Input';
import {
  validateUsername,
  validateUsernameMessage,
  validateName,
  validateNameMessage
} from '../../shared/validators';

const inputs = [
  {
    field: 'username',
    label: 'Username',
    type: 'text'
  },
  {
    field: 'name',
    label: 'Name',
    type: 'text'
  }
];

export const UserSettings = ({ settings, saveSettings }) => {
  const [formState, setFormState] = useState({
    username: {
      isValid: true,
      showError: false,
      value: settings.username
    },
    name: {
      isValid: true,
      showError: false,
      value: settings.name
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

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = true;

    if (field === 'username') {
      isValid = validateUsername(value);
    } else if (field === 'name') {
      isValid = validateName(value);
    }

    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const isUsernameValid = validateUsername(formState.username.value);
    const isNameValid = validateName(formState.name.value);

    if (!isUsernameValid || !isNameValid) {
      setFormState((prevState) => ({
        ...prevState,
        username: {
          ...prevState.username,
          isValid: isUsernameValid,
          showError: !isUsernameValid
        },
        name: {
          ...prevState.name,
          isValid: isNameValid,
          showError: !isNameValid
        }
      }));
      return;
    }

    saveSettings({
      username: formState.username.value,
      name: formState.name.value
    });
  };

  const isSubmitButtonDisabled = !formState.username.isValid || !formState.name.isValid;

  return (
    <form className="settings-form" onSubmit={handleFormSubmit}>
      {inputs.map((input) => (
        <Input
            key={input.field}
            field={input.field}
            label={input.label}
            value={formState[input.field].value}
            onChange={handleInputValueChange}
            onBlur={handleInputValidationOnBlur}
            showErrorMessage={formState[input.field].showError}
            validationMessage={
              !formState[input.field].isValid
                ? input.field === 'username'
                  ? validateUsernameMessage
                  : validateNameMessage
                : ''
            }
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
