export const Input = ({
  field,
  label,
  showErrorMessage,
  validationMessage,
  textArea,
  value, 
  onChange, 
  ...registerProps
}) => {
  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>
      <div>
        {textArea ? (
          <textarea
            {...registerProps}
            value={value}
            onChange={onChange}
            rows={5}
            style={{ maxWidth: '400px' }}
          />
        ) : (
          <input
            {...registerProps}
            value={value}
            onChange={onChange}
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

export const InputWithField = ({
  field,
  label,
  showErrorMessage,
  validationMessage,
  textArea,
  value,
  onChange,
  onBlur,
  ...registerProps
}) => {
  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>
      <div>
        {textArea ? (
          <textarea
            {...registerProps}
            value={value}
            onChange={(e) => onChange(e.target.value, field)}
            onBlur={(e) => onBlur && onBlur(e.target.value, field)}
            rows={5}
            style={{ maxWidth: '400px' }}
          />
        ) : (
          <input
            {...registerProps}
            value={value}
            onChange={(e) => onChange(e.target.value, field)}
            onBlur={(e) => onBlur && onBlur(e.target.value, field)}
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
