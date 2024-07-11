"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

function Modal({ children, open, className = "" }) {
  const dialog = useRef();
  const ref = useRef();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById("modal");
    setMounted(true);
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (open) modal.showModal();

    return () => (modal ? modal.close() : null);
  }, [open]);

  return mounted
    ? createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
          {children}
        </dialog>,
        ref.current
      )
    : null;
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Modal;
