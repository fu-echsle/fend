const create = (tags, imageUrl, previewURL, likes, comments, pageURL) => {
    return {
        tags: tags,
        imageUrl: imageUrl,
        previewURL: previewURL,
        likes: likes,
        comments: comments,
        pageURL: pageURL
    };
}

exports.create = create;