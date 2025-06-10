import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalsSlice";
import NotificationsModal from "./NotificationsModal";
import SelectLocationModal from "./SelectLocationModal";
import AddPostModel from "./AddPostModel";
// import NotificationsModall from "./AddPostModel";
export default function Modals() {
  //redux dispatch
  const dispatch = useDispatch();

  //name of the modal to open
  const open = useSelector((state) => state.modals.open);
  const modals = {
    selectLocationModal: SelectLocationModal,
    notificationsModal: NotificationsModal,
    AddPostModel: AddPostModel,
  };

  //if the modal is for editing or creating
  const modalProps = useSelector((state) => state.modals.modalProps);
  const ModalComponent = useMemo(() => modals[open], [open]);
  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <>
      {ModalComponent && (
        <ModalComponent open={true} {...modalProps} handleClose={close} />
      )}
    </>
  );
}
