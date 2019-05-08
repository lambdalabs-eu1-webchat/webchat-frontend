import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop:10,
    textColor:"ffffff",
    backgroundColor: "#2f465e",
    borderTop: "solid 6px #0CD4AF",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  subFooter:{
      backgroundColor: "rgb(255, 255, 255, 0.3)",
      color: theme.palette.text.primary,
  }
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className="container">
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={4}> 
           <p>
           psum dolor sit amet salami ham hock ham, hamburger corned beef short ribs kielbasa biltong
           </p>
        </Grid>
        <Grid item xs={12} sm={4}>
        <p>
           psum dolor sit amet salami ham hock ham, hamburger corned beef short ribs kielbasa biltong
           </p>
        </Grid>
        <Grid item xs={12} sm={4}>
        <p>
           psum dolor sit amet salami ham hock ham, hamburger corned beef short ribs kielbasa biltong
           </p>
        </Grid>
        <Grid className={classes.subFooter} item xs={12}>
          <p>
          Sum expectantes. Ego hodie expectantes. Expectantes, et misit unum de pueris Gus interficere. Et suus vos. Nescio quis, qui est bonus usus liberi ad Isai? Qui nosti ... Quis dimisit filios ad necem ... hmm? Gus! Est, ante me factus singulis 
           </p>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);