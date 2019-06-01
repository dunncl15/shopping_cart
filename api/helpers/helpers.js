exports.transformData = arr => {
  const data = {};
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    data[item.id] = item;
  }
  return { data, ids: Object.keys(data) };
};
