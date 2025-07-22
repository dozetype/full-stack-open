const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) =>
    blogs.reduce((acc, curr) => (acc += curr.likes), 0);

const favoriteBlog = (blogs) =>
    blogs.reduce((fav, curr) => (fav.likes < curr.likes ? curr : fav));

const mostBlogs = (blogs) => {
    authors = {};
    blogs.forEach((b) => {
        if (!authors[b.author]) authors[b.author] = 1;
        else authors[b.author]++;
    });
    const most = Object.keys(authors).reduce((theOne, curr) =>
        authors[theOne] < authors[curr] ? curr : theOne,
    );
    return { author: most, blogs: authors[most] };
};
const mostLikes = (blogs) => {
    authors = {};
    blogs.forEach((b) => {
        if (!authors[b.author]) authors[b.author] = b.likes;
        else authors[b.author] += b.likes;
    });
    const most = Object.keys(authors).reduce((theOne, curr) =>
        authors[theOne] < authors[curr] ? curr : theOne,
    );
    return { author: most, likes: authors[most] };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
