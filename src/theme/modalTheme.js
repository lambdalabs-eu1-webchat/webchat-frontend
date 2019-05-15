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
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    width: '500px',
    maxHeight: '100%',
    height: '200px',
    margin: '0 1rem',
    backgroundColor: theme.color.offWhite,
    boxShadow: theme.shadow.cardShadow,
    fontFamily: theme.font.fontFamily,
  },
};

export default modalTheme;
