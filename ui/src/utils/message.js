const parseMessage = (str) => {
    str = "[" + str + "]";
    const jsonString = str.replace(/'/g, '"');
    const obj = JSON.parse(jsonString);
    return obj[0];
};

export { parseMessage };
