const generatePassword = (
    symbolsNum: number,
    upperCaseFlag: boolean,
    lowerCaseFlag: boolean,
    numsFlag: boolean,
    specialSymbolsFlag: boolean
): string => {
    const arrayWidthSymbols = [
        [
            'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'
        ],
        [
            'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r',
            's', 't', 'u', 'v', 'w', 'x',
            'y', 'z'
        ],
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        [
            '!', '@', '#', '%', '^', '&', '*', '(', ')',
            '-', '_', '=', '+', '[', ']', '{', '}', '|',
            ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/'
        ]
    ];

    const allowedCategories: number[] = [];
    if (upperCaseFlag) allowedCategories.push(0);
    if (lowerCaseFlag) allowedCategories.push(1);
    if (numsFlag) allowedCategories.push(2);
    if (specialSymbolsFlag) allowedCategories.push(3);

    if (allowedCategories.length === 0) {
        return '';
    }

    let password = '';

    for (let i = 0; i < symbolsNum; i++) {
        const randomCategoryIndex = allowedCategories[Math.floor(Math.random() * allowedCategories.length)];
        const symbolsArray = arrayWidthSymbols[randomCategoryIndex];
        const randomSymbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
        password += randomSymbol;
    }

    return password;
}


export default generatePassword;
