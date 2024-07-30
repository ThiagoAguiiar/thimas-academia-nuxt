const getNotificationColor = (color: string) => {
  const colors = {
    SUCCESS: "green",
    WARNING: "yellow",
    ERROR: "red",
    DEFAULT: "gray",
    INFO: "blue",
  };

  return colors[color as keyof typeof colors];
};

const showNotification = (
  title: string,
  description: string,
  status: MsgType | keyof typeof MsgType,
  id?: string,
  timeout?: number,
) => {
  const toast = useToast();

  toast.add({
    title,
    description,
    color: getNotificationColor(status) as any,
    timeout: timeout || 2200,
    id: id,
  });
};

const removeNotification = (id: string | string[]) => {
  const toast = useToast();

  if (typeof id === "string") {
    toast.remove(id);
    return;
  }

  id.forEach((id) => {
    toast.remove(id);
  });
};

export default {
  show: showNotification,
  remove: removeNotification,
};
