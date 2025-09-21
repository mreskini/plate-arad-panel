export const getFullnameInitials = (fullname?: string | null): string[] => {
    if (fullname) {
        const nameParts = fullname.split(" ")
        const firstInitial = nameParts[0].charAt(0).toUpperCase()
        const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase()

        return [firstInitial, lastInitial]
    }

    return ["?"]
}
