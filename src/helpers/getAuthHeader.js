export const getAuthHeader = () => {
    const token = localStorage.getItem('JWT')
	let authHeader = {
        headers: {
            Authorization: token, 
        }
    }
    return authHeader
}