import { createContext, useReducer } from "react";

const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {},
});

const cartReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const updateItems = [...state.items];

		if (existingCartItemIndex > -1) {
			const existingItem = state.items[existingCartItemIndex];

			const updateItem = {
				...existingItem,
				quantity: existingItem.quantity + 1,
			};

			updateItems[existingCartItemIndex] = updateItem;
		} else {
			updateItems.push({ ...action.item, quantity: 1 });
		}

		return { ...state, items: updateItems };
	}
	if (action.type === "REMOVE_ITEM") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingCartItem = state.items[existingCartItemIndex];

		const updatedItems = [...state.items];

		if (existingCartItem.quantity === 1) {
			updatedItems.splice[(existingCartItemIndex, 1)];
		} else {
			const updateItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};

			updatedItems[existingCartItem] = updateItem;

			return { ...state, items: updatedItems };
		}
	}

};
export const CartContextProvider = ({ children }) => {
	const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

	const addItem = (item) => {
		dispatchCartAction({ type: "ADD_ITEM", item });
	};

	const removeItem = (id) => {
		dispatchCartAction({ type: "REMOVE_ITEM", id });
	};

	const cartContext = {
		items: cart.items,
		addItem,
		removeItem,
	};

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	);
};

export default CartContext;
