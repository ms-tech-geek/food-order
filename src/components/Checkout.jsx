import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";

const Checkout = () => {
	const { items: cartItems } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);

	const cartTotal = cartItems.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	const handleCloseCheckout = () => {
		hideCheckout();
	};

	return (
		<Modal open={progress === "checkout"} onClose={progress === 'checkout' ? handleCloseCheckout: null}>
			<form>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
				<Input label="Full Name" type="text" id="full-name" />
				<Input label="E-Mail Address" type="email" id="email" />
				<Input label="Street" type="text" id="street" />
				<div className="control-row">
					<Input label="Postal Code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>
				<p className="modal-actions">
					<Button type="button" textOnly onClick={handleCloseCheckout}>
						Close
					</Button>
					<Button>Submit Order</Button>
				</p>
			</form>
		</Modal>
	);
};

export default Checkout;
