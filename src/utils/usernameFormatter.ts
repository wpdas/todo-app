const usernameFormatter = (text: string) =>
  text
    .replace(/[^a-zA-Z0-9,. ]/g, "")
    .replace(/\s/g, ".")
    .toLowerCase();

export default usernameFormatter;
