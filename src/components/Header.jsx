import { useContext, useRef } from "react";

import CartModal from "./CartModal.jsx";
import { CartContext } from "../store/cartContext.jsx";

export default function Header() {
    const { items } = useContext(CartContext);
    const modal = useRef();

    const cartQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    function handleOpenCartClick() {
        modal.current.open();
    }

    const modalActions = (
        <>
            <button
                aria-label="Close cart"
                onClick={() => modal.current.close()}
            >
                Close
            </button>
            {cartQuantity > 0 && (
                <button aria-label="Proceed to checkout">Checkout</button>
            )}
        </>
    );

    return (
        <>
            <CartModal ref={modal} title="Your Cart" actions={modalActions} />
            <header id="main-header">
                <div id="main-title">
                    <img src="logo.png" alt="Elegant model" />
                    <h1>Elegant Context</h1>
                </div>
                <p>
                    <button onClick={handleOpenCartClick}>
                        Cart ({cartQuantity})
                    </button>
                </p>
            </header>
        </>
    );
}
