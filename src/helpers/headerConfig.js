export const getHeaderConfig = (token) => {
    return {
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Accept": "application/json",
        }
    };
};