export const extractId = (regExp: RegExp, path = window.location.pathname) => {
  const match = path.match(regExp);
  if (match) {
    const id = parseInt(match[1], 10);
    return id;
  }
  throw new Error("Invalid id");
};
