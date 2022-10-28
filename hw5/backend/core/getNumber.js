let number = 0

const getNumber = (restart) => {
    if (!number && !restart) {
        number = Math.floor(Math.random() * 100) + 1;
    }
    else if(restart) {
        number = 0;
    }
    return number
}

export default getNumber