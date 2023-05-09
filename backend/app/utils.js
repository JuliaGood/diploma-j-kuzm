const isEmpty = (value) => {
  return value === null || value === undefined || value.length === 0;
}

const isNotEmpty = (value) => {
  return value !== null && value !== undefined && value.length > 0;
}

const isNotNull = (value) => {
  return (value !== null || value !== undefined);
}

module.exports = {
  isEmpty,
  isNotEmpty,
  isNotNull
}