const PLATE_LENGTH = 11
export const isPlateSerialValid = (serial: string | null | undefined): boolean => {
    if (!serial) return false
    if (serial.length !== PLATE_LENGTH) return false

    return true
}
