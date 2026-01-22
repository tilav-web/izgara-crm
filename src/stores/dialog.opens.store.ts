import { create } from "zustand";

interface DialogOpensStore {
    opens: Record<string, boolean>
    handleOpen: ({ name, bool }: { name: string; bool: boolean }) => void
}

export const useDialogOpensStore = create<DialogOpensStore>(set => ({
    opens: {},
    handleOpen: ({ name, bool }) => set(state => {
        return {
            opens: {
                ...state.opens,
                [name]: bool
            }
        }
    })
}))