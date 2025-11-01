export const createFile = (fileName: string, type: string, payload: string) => {
    const blob = new Blob([payload], { type });
    return { blob, fileName };
};

export const downloadFile = ({
    blob,
    fileName,
}: {
    blob: Blob;
    fileName: string;
}) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            removeEventListener('click', clickHandler);
            a.remove();
        }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
};
