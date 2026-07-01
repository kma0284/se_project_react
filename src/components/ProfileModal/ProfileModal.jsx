
import ModalWithForm from "../ModalWithForm/ModalWithForm";


export default function ProfileModal({
  activeModal,
  onClose,
  onSubmit,
  isValid,
  children,
}) {
  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save"
      activeModal={activeModal}
      isOpen={activeModal === "edit-profile"}
      name="edit-profile"
      
      onClose={onClose}
      onSubmit={onSubmit}
      isValid={isValid}
    >
      {children}
    </ModalWithForm>
  );
}
