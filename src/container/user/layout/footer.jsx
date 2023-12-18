import SocketClient from "react-stomp";
import { API } from "../../../constants/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../slices/AlertSlice";
function Footer() {
  const dispatch = useDispatch();
  const onMessage = (msg) => {
    dispatch(setAlert({ type: "warning", content: msg }));
  };
  return (
    <div>
      <SocketClient
        url={`${API.socket}`}
        topic={["/job/notifications"]}
        onMessage={onMessage}
      />
    </div>
  );
}

export default Footer;
