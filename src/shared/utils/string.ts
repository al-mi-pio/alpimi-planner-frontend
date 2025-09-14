export const isContainedInOtherString = (input: string, content: string) =>
    content.toLowerCase().includes(input.trim().toLowerCase());

export const capitalize = (input: string) =>
    input[0].toUpperCase() + input.slice(1);
