import { StyleSheet } from "react-native";
import { Modal, Portal, ModalProps } from "react-native-paper";

interface ModalComponentProps extends ModalProps {
  children: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalComponent(props: ModalComponentProps) {
  const hideModal = () => props.onDismiss ? props.onDismiss() : props.setVisible(false);
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={hideModal}
        contentContainerStyle={modalStyle.modalContainer}
      >
        {props.children}
      </Modal>
    </Portal>
  );
}

const modalStyle = StyleSheet.create({
  modalContainer: {
    width: "90%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    margin: "auto",
  },
});
