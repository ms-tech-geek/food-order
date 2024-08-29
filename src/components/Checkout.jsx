import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";

const Checkout = () => {
	const { items: cartItems } = useContext(CartContext);

	const cartTotal = cartItems.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	return (
		<Modal open={true}>
			<form>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
			</form>
		</Modal>
	);
};

export default Checkout;
