import { ADD_TO_CHIPS, EMPTY_CHIPS, REMOVE_FROM_CHIPS } from "./constant"

export const addToCart = (data) => {
    console.warn("action is called", data)
    return {
        type: ADD_TO_CHIPS,
        data
    }
}

export const removeToCart = (data) => {
    console.warn("action removeToCart", data)
    return {
        type: REMOVE_FROM_CHIPS,
        data
    }
}

export const emptyCart = () => {
    console.warn("action emptyCart",)
    return {
        type: EMPTY_CHIPS,
    }
}