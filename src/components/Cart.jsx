import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import CartItem from "./CartItem";

const Cart = () => {
	const { items: cartItems, addItem, removeItem } = useContext(CartContext);
	const { progress, hideCart } = useContext(UserProgressContext);

	const cartTotal = cartItems.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	const handleCloseCart = () => {
		hideCart();
	};
	return (
		<Modal className="cart" open={progress === "cart"}>
			<h2>Your Cart</h2>
			<ul>
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						name={item.name}
						quantity={item.quantity}
						price={item.price}
						onIncrease={() => addItem(item)}
						onDecrease={() => removeItem(item.id)}
					/>
				))}
			</ul>
			<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
			<p className="modal-actions">
				<Button textOnly onClick={handleCloseCart}>
					Close
				</Button>
				<Button>Go To Checkout</Button>
			</p>
		</Modal>
	);
};

export default Cart;
