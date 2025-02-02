import { toast } from "react-toastify";
import { FaTrash, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export const showToast = (message, type = "success") => {
  let icon;
  let progressStyle = {};

  switch (type) {
    case "success":
      icon = <FaCheckCircle size={18} color="green" />;
      break;
    case "error":
      icon = <FaExclamationCircle size={18} color="red" />;
      break;
    case "warning":
      icon = <FaExclamationCircle size={18} color="orange" />;
      type = "error";
      break;
    case "delete":
      icon = <FaTrash size={18} color="red" />;
      type = "success";
      progressStyle = { background: "red" };
      break;
    default:
      icon = "ℹ️";
      type = "success";
  }

  toast[type](message, {
    icon,
    theme: "light",
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progressStyle,
  });
};
