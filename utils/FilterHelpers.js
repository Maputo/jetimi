const mapParamsToFilters = (query) => {
  const filterParams = query
    ? query.split('?')[1].split('&')
      .find((param) => param.startsWith('filter'))
      .split('=')[1]
    : '';

  if (filterParams) {
    return filterParams.split(':')
      .map((param) => {
        const keyValue = param.split('-');
        return ({ id: keyValue[0], value: keyValue[1] });
      });
  }

  return [];
};

export { mapParamsToFilters };
