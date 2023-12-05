export const downloadFile = async (file: File) => {
  const url = URL.createObjectURL(file)
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url)
}