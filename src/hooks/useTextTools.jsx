function useTextTools() {
    const truncateText = (text, length) => {
        if (text.length <= length) {
            return text;
        }
        return text.slice(0, length) + '...';
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const imagePathResource = (fileName, path)  => {
        return fileName.startsWith('http') || fileName.startsWith('blob') ? fileName : '/images/' + path + '/' + fileName
    }

    return { truncateText, validateEmail, imagePathResource};
}

export { useTextTools };