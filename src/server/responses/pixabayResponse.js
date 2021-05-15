const create = (imageUrl, previewURL, likes, comments, pageURL) => {
    return {
        imageUrl: imageUrl,
        previewURL: previewURL,
        likes: likes,
        comments: comments,
        pageURL: pageURL
    };
}

exports.create = create;