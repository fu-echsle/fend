function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        return "Welcome, Captain!";
    } else {
        return "Hello, redshirt!";
    }
}

export { checkForName }
