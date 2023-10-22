export const makeBold = (input, keyword) => {
  const re = new RegExp(keyword, 'gi');
  return input.replace(re, (match) => `<b>${match}</b>`);
};
