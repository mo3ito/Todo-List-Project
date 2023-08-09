interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {


  return (
    <div id="my_modal_3" className={`modal ${modalOpen && "modal-open"}`}>
      <div className="modal-box">
        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {modalOpen && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Modal;
