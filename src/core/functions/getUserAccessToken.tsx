export const getUserAccessToken = (): string | null => {
    const authStateStringifiedJson = localStorage.getItem("AUTH_STATE")
    if (authStateStringifiedJson) {
        const obj = JSON.parse(authStateStringifiedJson)
        if (obj?.state?.accessToken) return obj.state.accessToken
    }
    return null
}
