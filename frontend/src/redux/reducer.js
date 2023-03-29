import { ADD_TO_CHIPS, EMPTY_CHIPS, REMOVE_FROM_CHIPS } from "./constant"



export const cartData = (data = [], action) => {
    switch (action.type) {
        case ADD_TO_CHIPS:
            console.warn("ADD_TO_CHIPS condition ", action)
            return [action.data, ...data]
            case REMOVE_FROM_CHIPS:
                console.warn("REMOVE_FROM_CHIPS condition ", action);
                // data.length= data.length? data.length-1:[]
                const remainingItems= data.filter((item)=>item.id!==action.data)
                return [...remainingItems]
                case EMPTY_CHIPS:
                    console.warn("EMPTY CHIPS condition ", action);
                    data =[]
                    return [...data]
        default:
            return data
    }
}