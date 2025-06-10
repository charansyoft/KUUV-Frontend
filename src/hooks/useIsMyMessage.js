export default function useIsMyMessage(message) {
  console.log({ message });
  message.createdBy?._id == "1" ? true : false;
  //   const userId = useSelector((state) => state?.auth?.user?._id);
  //   return message?.createdBy.id === userId;
}
