function useTextTools() {
    const truncateText = (text, length) => {
        if (text.length <= length) {
            return text;
        }
        return text.slice(0, length) + '...';
    }

    return { truncateText };
}

export { useTextTools };