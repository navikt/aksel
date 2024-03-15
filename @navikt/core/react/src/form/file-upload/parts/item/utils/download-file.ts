export const downloadFile = (file: File): void => {
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = file.name;
  a.click();

  URL.revokeObjectURL(url);
};
