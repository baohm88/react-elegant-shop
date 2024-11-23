import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open: () => dialog.current.showModal(),
        close: () => dialog.current.close(),
    }));

    return createPortal(
        <dialog id="modal" ref={dialog}>
            <h2>{title}</h2>
            <Cart />
            <form method="dialog" id="modal-actions">
                {actions}
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default CartModal;
