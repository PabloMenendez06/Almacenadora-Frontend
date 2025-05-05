export const validatePassword = (password) => {
    const regex = /^\S{8,12}$/;
    return regex.test(password);
}

export const validatePasswordMessage = '  La contraseña debe ser entre 8 y 12 caracteres'