import { useModal } from '../../context/Modal';
import './Navigation.css'; // Optional: style the dropdown items

function OpenModalMenuItem({ itemText, onItemClick, modalComponent }) {
  const { setModalContent } = useModal();

  const handleClick = () => {
    if (typeof onItemClick === 'function') onItemClick();
    setModalContent(modalComponent);
  };

  return (
    <li className="modal-menu-item" onClick={handleClick}>
      {itemText}
    </li>
  );
}

export default OpenModalMenuItem;

// import { useModal } from '../../context/Modal';

// function OpenModalMenuItem({
//   modalComponent, // component to render inside the modal
//   itemText, // text of the menu item that opens the modal
//   onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
//   onModalClose // optional: callback function that will be called once the modal is closed
// }) {
//   const { setModalContent, setOnModalClose } = useModal();

//   const onClick = () => {
//     if (onModalClose) setOnModalClose(onModalClose);
//     setModalContent(modalComponent);
//     if (typeof onItemClick === "function") onItemClick();
//   };

//   return (
//     <li onClick={onClick}>{itemText}</li>
//   );
// }

// export default OpenModalMenuItem;