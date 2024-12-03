export const darkColors = {
    secondaryText: '#0E1416',
    primaryText: '#F2F2F2',
    sectionBackground: '#30292F',
    primaryBackground: '#282127',
    elementBackground: '#3D3A41',
    primaryAccent: '#B5B5C3',
    error: '#E01C30',
    success: '#49A95C',
    highlight: '#1D8EE5',
} as const;

export const lightColors = {
    secondaryText: '#0E1416',
    primaryText: '#0E1416',
    sectionBackground: '#E3E3E3',
    primaryBackground: '#C9C8C8',
    elementBackground: '#FEFEFE',
    primaryAccent: '#FFFFFF',
    error: '#E01C30',
    success: '#49A95C',
    highlight: '#1D8EE5',
} as const;

export const lightTheme = {
    name: 'light',
    colors: lightColors,
};
export const darkTheme = {
    name: 'dark',
    colors: darkColors,
};
