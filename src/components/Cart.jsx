import { useContext } from "react";
import { CartContext } from "../store/cartContext";

export default function Cart() {
    const { items, updateCartItemQuantity } = useContext(CartContext);

    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div id="cart">
            {items.length === 0 ? (
                <p>No items in cart!</p>
            ) : (
                <ul id="cart-items">
                    {items.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div>
                                <span>{item.name}</span>
                                <span> (${item.price.toFixed(2)})</span>
                            </div>
                            <div className="cart-item-actions">
                                <button
                                    aria-label={`Decrease quantity of ${item.name}`}
                                    onClick={() =>
                                        updateCartItemQuantity(item.id, -1)
                                    }
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    aria-label={`Increase quantity of ${item.name}`}
                                    onClick={() =>
                                        updateCartItemQuantity(item.id, 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <p id="cart-total-price">
                Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
        </div>
    );
}
