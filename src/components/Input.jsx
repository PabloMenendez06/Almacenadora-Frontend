export const Input = ({
    field,
    label,
    showErrorMessage,
    validationMessage,
    textArea,
    onChange,
    onBlur,
    value,
    ...props
  }) => {
    return (
      <>
        <div className="auth-form-label">
          <span>{label}</span>
        </div>
        <div>
          {textArea ? (
            <textarea
              {...props}
              value={value}
              onChange={(e) => onChange?.(e.target.value, field)}
              onBlur={(e) => onBlur?.(e.target.value, field)}
              rows={5}
              style={{ maxWidth: '400px' }}
            />
          ) : (
            <input
              {...props}
              value={value}
              onChange={(e) => onChange?.(e.target.value, field)}
              onBlur={(e) => onBlur?.(e.target.value, field)}
            />
          )}
          {showErrorMessage && (
            <span className="auth-form-validation-message">
              {validationMessage}
            </span>
          )}
        </div>
      </>
    );
  };
  