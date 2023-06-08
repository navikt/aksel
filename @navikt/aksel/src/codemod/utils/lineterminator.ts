export const getLineTerminator = (source: string) => ({
  lineTerminator: source.includes("\r\n") ? "\r\n" : "\n",
});
