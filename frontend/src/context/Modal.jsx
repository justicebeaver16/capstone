import { createContext, useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null);
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal,
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  if (!modalRef || !modalRef.current || !modalContent) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close" onClick={closeModal}>
          &times;
        </div>
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export function useModal() {
  return useContext(ModalContext);
}