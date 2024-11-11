const reverseFormattedBookTitle = (title) => {
    return title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
};

export default reverseFormattedBookTitle;