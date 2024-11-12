const formattedBookTitle = (title) => {
    return title
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (l, i) => {
            if (title[i - 1] === "'") {
                return l;
            }
            return l.toUpperCase();
        });
};

export default formattedBookTitle;