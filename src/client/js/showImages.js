function showImages(city) {
    const resultSection = document.getElementById('images');
    const resultContainer = document.getElementById('imagesList');
    const spinnerContainer = document.getElementById('spinner');

    spinnerContainer.style.display = 'inherit';

    console.log('::: Form Submitted :::');
    fetch('http://localhost:8081/pixabay', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: city
        })
    })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(function (res) {
            if(res.error) {
                resultContainer.replaceChild(showError(res), document.querySelector('.imagesWrapper'));
                resultSection.style.display = 'inherit';
                spinnerContainer.style.display = 'none';
            } else {
                resultContainer.replaceChild(listImages(res), document.querySelector('.imagesWrapper'));

                resultSection.style.display = 'inherit';
                spinnerContainer.style.display = 'none';
            }
        })
        .catch(reason => {
            resultSection.style.display = 'none';
            spinnerContainer.style.display = 'none';
            alert(reason.message);
        });
}

const listImages = (res) => {
    const fragment = document.createDocumentFragment();
    const resultWrapper = document.createElement('div');

    res.images.forEach(elem => {
        const newElem = document.createElement('div');
        const thumbnailLink = document.createElement('a');
        const headline = document.createElement('h3');
        const headlineLink = document.createElement('a');
        const thumbnail = document.createElement('img');
        const likes = document.createElement('p');
        const comments = document.createElement('p');

        headlineLink.textContent = elem.tags;
        headlineLink.setAttribute('href', elem.pageURL);
        headlineLink.setAttribute('target', '_blank');
        headline.appendChild(headlineLink);
        thumbnail.setAttribute('src', elem.previewURL);
        likes.textContent = elem.likes;
        likes.setAttribute('title', 'likes');
        likes.classList.add('likes');
        comments.textContent = elem.comments;
        comments.setAttribute('title', 'comments');
        comments.classList.add('comments');

        thumbnailLink.appendChild(thumbnail);
        thumbnailLink.setAttribute('href', elem.imageUrl);
        thumbnailLink.setAttribute('target', '_blank');

        newElem.appendChild(headline);
        newElem.appendChild(thumbnailLink);
        newElem.appendChild(likes);
        newElem.appendChild(comments);

        resultWrapper.appendChild(newElem);
    });

    resultWrapper.className = 'imagesWrapper';
    fragment.appendChild(resultWrapper);
    return fragment;
};

const showError = (res) => {
    const fragment = document.createDocumentFragment();
    const resultWrapper = document.createElement('div');
    const headline = document.createElement('h3');
    headline.textContent = res.error;
    resultWrapper.appendChild(headline);
    resultWrapper.className = 'imagesWrapper';
    fragment.appendChild(resultWrapper);
    return fragment;
};

export {showImages};