const decode = (encoded, translations, excludedKeys) => {
  const decoded = encoded.map((item) => {
    const decodedItem = {};
    const encodedKeys = Object.keys(item);
    encodedKeys.forEach((key) => {
      if (excludedKeys.includes(key)) {
        decodedItem[key] = item[key];
      } else {
        decodedItem[key] = translations[item[key]] || item[key];
      }
    });
    return decodedItem;
  });
  return decoded;
};

export default decode;
