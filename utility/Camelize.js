export const Camelize = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((s) => (s.startsWith("(") && s.endsWith(")") ? s.slice(0, 2).toUpperCase() + s.slice(2) : s.slice(0, 1).toUpperCase() + s.slice(1)))
    .join(" ");
};
