import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type T_ModalStates = {
    modalVisibility: Record<string, boolean>
}

type T_ModalActions = {
    openModal: (name: string) => void
    closeModal: (name: string) => void
}

// Create the modal store using Zustand
export const useModal = create(
    immer<T_ModalStates & T_ModalActions>(set => ({
        modalVisibility: {},
        openModal(name) {
            set(state => {
                state.modalVisibility[name] = true
            })
        },
        closeModal(name) {
            set(state => {
                state.modalVisibility[name] = false
            })
        },
    }))
)
