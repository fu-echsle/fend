function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    const url = document.getElementById('url').value;
    const sentences = document.getElementById('sentences').value;
    const resultContainer = document.getElementById('results');
    const spinnerContainer = document.getElementById('spinner');
    const language = document.getElementById('language');
    const summary = document.getElementById('summary');

    resultContainer.style.display = 'none';
    spinnerContainer.style.display = 'inherit';

    console.log('::: Form Submitted :::');
    fetch('http://localhost:8081/summarize', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: url,
            sentences: sentences
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(function (res) {
            language.textContent = res.language;
            summary.textContent = res.summary;

            resultContainer.style.display = 'inherit';
            spinnerContainer.style.display = 'none';
        })
        .catch(reason => {
            resultContainer.style.display = 'none';
            spinnerContainer.style.display = 'none';
            alert(reason.message);
        });
}

export {handleSubmit};