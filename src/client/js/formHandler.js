function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    alert(Client.checkForName(formText))

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/store', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: formText
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(function (res) {
            document.getElementById('results').innerHTML = res.message
        })
}

export {handleSubmit}
