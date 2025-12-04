import { toast, ToasterProps } from "sonner";
const useShowToast = () => {
  type ToastOptions = {
    message: string;
    description?: string;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    duration?: number;
    icon?: React.ReactNode;
  };
  return {
    showSuccess: ({
      message,
      description,
      position,
      duration,
      icon,
    }: ToastOptions) => {
      toast.success(message, {
        description,
        position,
        duration,
        icon,
      } as Partial<ToasterProps>);
    },
    showError: ({
      message,
      description,
      position,
      duration,
      icon,
    }: ToastOptions) => {
      toast.error(message, {
        description,
        position,
        duration,
        icon,
      } as Partial<ToasterProps>);
    },
  };
};

export default useShowToast;
