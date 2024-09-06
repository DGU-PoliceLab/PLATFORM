const num_to_array = (n, s = 1) => {
    let result = [];
    for (let i = s; i < n + s; i++) {
        result.push(i);
    }
    return result;
};

const indicatorArray = (c, l) => {
    c += 1;
    l += 1;
    console.log(c, l);
    let result = [];
    if (c > 3) {
        result = [c - 3, c - 2, c - 1, c];
    } else {
        result = num_to_array(c, 1);
    }
    console.log(result);
    if (l - 3 > c) {
        result = [...result, c + 1, c + 2, c + 3];
    } else {
        let temp = num_to_array(l - c, c + 1);
        result = [...result, ...temp];
    }
    console.log(result);
    return result;
};

export { num_to_array, indicatorArray };
