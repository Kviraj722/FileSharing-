import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ToasterSuccess = (i: string, time: number) => {
  toast.success(i, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default ToasterSuccess;
