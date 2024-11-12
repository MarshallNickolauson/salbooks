const formattedBookTitle = (title) => {
    return title
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default formattedBookTitle;