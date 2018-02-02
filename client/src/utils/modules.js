export const paginateText = (text) => {
  const TEXT_LENGTH = 500
  const paginate = text
  if (text)
    if(text.length > TEXT_LENGTH)
      return paginate.slice(0, TEXT_LENGTH) + '...';
    return text
}
