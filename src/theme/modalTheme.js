import theme from './styledTheme';

const modalTheme = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  restrictedContent: {
    position: 'absolute',
    maxWidth: '500px',
    maxHeight: '200px',
    margin: '3rem auto',
    boxShadow: theme.shadow.cardShadow,
    fontFamily: theme.font.fontFamily,
  },
};

export default modalTheme;
