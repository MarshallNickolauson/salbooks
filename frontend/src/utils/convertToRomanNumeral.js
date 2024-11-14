const convertToRomanNumeral = (num) => {
    const romanNumerals = {
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };

    let roman = '';

    for (let key in romanNumerals) {
        while (num >= romanNumerals[key]) {
            roman += key;
            num -= romanNumerals[key];
        }
    }

    return roman;
};

export default convertToRomanNumeral;