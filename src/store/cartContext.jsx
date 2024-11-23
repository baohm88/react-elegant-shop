import { createContext, useReducer, useCallback } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateCartItemQuantity: () => {},
});

const initialCartState = {
    items: [],
};

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const updatedItems = [...state.items];
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );

            if (existingCartItemIndex >= 0) {
                const updatedItem = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find(
                    (product) => product.id === action.payload.id
                );
                if (!product) {
                    console.error(
                        `Product with id ${action.payload.id} not found.`
                    );
                    return state;
                }
                updatedItems.push({
                    id: action.payload.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return { ...state, items: updatedItems };
        }

        case "UPDATE_ITEM": {
            const updatedItems = [...state.items];
            const { productId, amount } = action.payload;

            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === productId
            );

            if (updatedItemIndex === -1) return state; // Item not found

            if (typeof amount !== "number" || isNaN(amount)) {
                console.error(`Invalid quantity: ${amount}`);
                return state;
            }

            const updatedItem = { ...updatedItems[updatedItemIndex] };
            updatedItem.quantity += amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return { ...state, items: updatedItems };
        }

        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
}

export default function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    const handleAddItemToCart = useCallback((id) => {
        dispatch({ type: "ADD_ITEM", payload: { id } });
    }, []);

    const handleUpdateCartItemQuantity = useCallback((productId, amount) => {
        dispatch({ type: "UPDATE_ITEM", payload: { productId, amount } });
    }, []);

    const ctxValue = {
        items: state.items,
        addItemToCart: handleAddItemToCart,
        updateCartItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
