import { ModalContext } from "@app/contexts/ModalProvider";
import { useContext } from "react";

const useModal = () => useContext(ModalContext);
export default useModal;
