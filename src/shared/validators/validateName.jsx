export const validateName = (name) => {
    const regex = /^.{5,30}$/;
    return regex.test(name);
}

export const validateNameMessage = 'El nombre de usuario debe tener entre 5 y 30 caracteres (se permiten espacios)';
