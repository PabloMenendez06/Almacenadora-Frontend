export const Input = ({
    field,
    label,
    showErrorMessage,
    validationMessage,
    textArea,
    ...props  // <-- Captura todo lo que viene de register
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
                        rows={5}
                        style={{ maxWidth: '400px'}}
                    />
                ) : (
                    <input
                        {...props}
                    />
                )}
                {showErrorMessage && (
                  <span className="auth-form-validation-message">
                    {validationMessage}
                  </span>
                )}
            </div>
        </>
    )
}
