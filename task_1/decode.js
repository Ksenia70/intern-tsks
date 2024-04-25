const decode = (encoded, translations, excludedKeys) => {
  let unicValues = [];
  const repeatValues = [];
  const decoded = encoded.map((item) => {
    const decodedItem = {};
    const encodedKeys = Object.keys(item);
    encodedKeys.forEach((key) => {
      if (excludedKeys.includes(key)) {
        decodedItem[key] = item[key];
      } else {
        decodedItem[key] =
          typeof translations[item[key]] === "undefined"
            ? item[key]
            : translations[item[key]];
      }
      if (!isNaN(item[key]) && !excludedKeys.includes(key)) {
        if (!repeatValues.includes(item[key])) {
          if (unicValues.includes(item[key])) {
            repeatValues.push(item[key]);
            unicValues = unicValues.filter(
              (unicItem) => unicItem !== item[key]
            );
          } else {
            unicValues.push(item[key]);
          }
        }
      }
    });
    return decodedItem;
  });
  return { decoded, unicValues };
};

export default decode;
