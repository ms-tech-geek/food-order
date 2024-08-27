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
		// Remove the item from the state ...
	}
};

const CartContextProvider = ({ children }) => {
	useReducer(cartReducer, { items: [] });

	return <CartContext.Provider>{children}</CartContext.Provider>;
};

export default CartContext;
