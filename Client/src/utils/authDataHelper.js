

export const getAuthLocal = () => {

    const authData = localStorage.getItem('authData');

    return authData;
}

export const setAuthToLocalStorage = (authData) => {

    localStorage.setItem('authData', JSON.stringify(authData));

}