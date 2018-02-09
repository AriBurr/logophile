export const objectCheck = (obj) => {
  return Object.keys(obj).length !== 0;
}

export const paginateText = (text, length) => {
  const TEXT_LENGTH = length;
  const paginate = text;
  if (text)
    if(text.length > TEXT_LENGTH)
      return paginate.slice(0, TEXT_LENGTH) + '...';
    return text;
}
