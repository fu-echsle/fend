function handleSentiment(event) {
    event.preventDefault();

    // check what text was put into the form field
    const txt = document.getElementById('text').value;
    const language = document.getElementById('sentimentLanguage').value;
    const resultContainer = document.querySelector('.sentiment.result');
    const spinnerContainer = document.getElementById('spinner');

    document.querySelectorAll('.result').forEach(it => {
        it.style.display = 'none';
    });
    spinnerContainer.style.display = 'inherit';

    console.log('::: Form Submitted :::');
    fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            txt: escape(txt),
            language: language
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(function (res) {
            //{"agreement":"AGREEMENT","subjectivity":"SUBJECTIVE","confidence":"92","irony":"NONIRONIC"}
            resultContainer.textContent = analyzeResult(res);

            resultContainer.style.display = 'inherit';
            spinnerContainer.style.display = 'none';
        })
        .catch(reason => {
            resultContainer.style.display = 'none';
            spinnerContainer.style.display = 'none';
            alert(reason.message);
        });
}

function analyzeResult(res) {
    return `The sentiment analysis found your given example to be an 
            ${res.agreement.toLowerCase()}. 
            It was deemed to be ${res.subjectivity.toLowerCase()} and ${res.irony.toLowerCase()}. 
            The analysis has a confidence score of ${res.confidence}.
            It found ${res.sentenceCount} sentences and a list of ${res.sentimentEntities} entities.`;
}

export {handleSentiment};