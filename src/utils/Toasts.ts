import { toast } from "sonner";

const toastConfig = (mode: string) => {
  return {
    unstyled: true,
    className: `alert ${mode} alert-dash min-w-80 min-h-14`,
  };
};

const yubiToast = (text: string, mode: string) => {
  switch (mode) {
    case "default":
      toast(text, toastConfig(""));
      break;
    case "success":
      toast.success(text, toastConfig("alert-success"));
      break;
    case "error":
      toast.error(text, toastConfig("alert-error"));
      break;
    case "warning":
      toast.warning(text, toastConfig("alert-warning"));
      break;
    case "info":
      toast.info(text, toastConfig("alert-info"));
      break;
  }
};

const NoFingersDetected = () => {
  yubiToast("Minimum of two fingers required to start.", "error");
};

export { NoFingersDetected, yubiToast };
