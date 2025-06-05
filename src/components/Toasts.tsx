import { toast } from "sonner";

const NoFingersDetected = () => {
  toast.warning("No Fingers Detected", {
    unstyled: true,
    className: "alert alert-warning alert-soft w-80 h-14",
  });
};

export { NoFingersDetected };
