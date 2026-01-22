
export type CategoryFormState = {
    id: number | undefined
    name: string
    image: File | undefined
    dialog_open: boolean
}

export type CategoryFormAction = {
    type: 'UPDATE_FEILD',
    field: keyof CategoryFormState,
    value: CategoryFormState[keyof CategoryFormState]
} | {
    type: 'TOGGLE_DIALOG';
    value: boolean
} | {
    type: 'SET_FORM_DATA';
    payload: Partial<CategoryFormState>
}

export const CategoryFormInitialState: CategoryFormState = {
    id: undefined,
    name: '',
    image: undefined,
    dialog_open: false
}

export const categoryFormReducer = (state: CategoryFormState, action: CategoryFormAction) => {
    switch (action.type) {
        case 'UPDATE_FEILD':
            return { ...state, [action.field]: action.value }
        case 'TOGGLE_DIALOG':
            return { ...state, dialog_open: action.value }
        case 'SET_FORM_DATA':
            return { ...state, ...action.payload }
        default:
            return state
    }
}