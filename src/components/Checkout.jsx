import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "../hooks/useHttp";

const requestConfig = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
};

const Checkout = () => {
	const { items: cartItems } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);

	const cartTotal = cartItems.reduce(
		(totalPrice, item) => totalPrice + item.quantity * item.price,
		0
	);

	const {
		data,
		isLoading: isSending,
		error,
		sendRequest,
	} = useHttp({
		url: `http://localhost:3000/orders`,
		config: requestConfig,
	});

	const handleCloseCheckout = () => {
		hideCheckout();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const fd = new FormData(event.target);
		const customerData = Object.fromEntries(fd.entries());

		sendRequest(
			JSON.stringify({
				orders: {
					items: cartItems,
					customer: customerData,
				},
			})
		);
	};

	let actions = (
		<>
			<Button type="button" textOnly onClick={handleCloseCheckout}>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	);

	if (isSending) {
		actions = <span>Sending order data...</span>;
	}

	return (
		<Modal
			open={progress === "checkout"}
			onClose={progress === "checkout" ? handleCloseCheckout : null}
		>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
				<Input label="Full Name" type="text" id="name" />
				<Input label="E-Mail Address" type="email" id="email" />
				<Input label="Street" type="text" id="street" />
				<div className="control-row">
					<Input label="Postal Code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>
				<p className="modal-actions">{actions}</p>
			</form>
		</Modal>
	);
};

export default Checkout;
