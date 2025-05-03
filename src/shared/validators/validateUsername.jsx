export const validateUsername = (username) => {
    const regex = /^\S{3,12}$/;
    return regex.test(username);
}

export const validateUsernameMessage = 'El nombre de usuario debe estar entre 3 y 12 caracteres sin espacios'