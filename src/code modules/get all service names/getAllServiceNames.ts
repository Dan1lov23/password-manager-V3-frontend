const getAllServiceNames = (passwords:any) => {
    const allServiceNamesArray = [];
    for (let a = 0; a < passwords.length; a++) {
        allServiceNamesArray.push(passwords[a].serviceName);
    }
    return allServiceNamesArray;
}

export default getAllServiceNames;
