export default function useFile() {
  const convertBase64StringToFile = (base64String: string) => {
    const base64Data = base64String.replace(/^data:\w+\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const mimeType = base64String.match(/^data:(\w+\/\w+);base64,/);

    const createURL = (fileBaseName: string) => {
      return (
        "https://hobygydkvuueavhuqjsv.supabase.co/storage/v1/object/public/user-photo/" +
        fileBaseName
      );
    };

    return {
      buffer,
      mimeType: mimeType![1],
      createURL,
    };
  };

  return { convertBase64StringToFile };
}
