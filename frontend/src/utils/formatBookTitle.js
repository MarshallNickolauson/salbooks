const formattedBookTitle = (title) => {
    return title
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default formattedBookTitle;