export const isContainedInOtherString = (input: string, content: string) =>
    content.toLowerCase().includes(input.trim().toLowerCase());
