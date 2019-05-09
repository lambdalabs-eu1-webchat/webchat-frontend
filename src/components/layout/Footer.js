import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    textColor: 'ffffff',
    backgroundColor: '#2f465e',
    borderTop: 'solid 6px #0CD4AF',
    paddingTop: '20px',
    overflowX: 'hiden',
    color: '#fff',
    fontSize: '18px'
    // borderBottom: "solid 6px #0CD4AF",
  },
  footerSections: {
    margin: '3px',
    padding: '10px',
    color: 'rgba(255,255,255)'
  },
  subFooter: {
    paddingBottom: '8px',
    margin: '20px',
    color: '#fff',
    fontSize: '18px'
  }
});

class Footer extends React.Component {
  // date incorperated

  render() {
    const { classes } = this.props;
    const currentYear = new Date().getFullYear();
    return (
      <div className="container">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.footerSections}>
                psum dolor sit amet salami ham hock ham, hamburger corned beef
                short ribs kielbasa biltong
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.footerSections}>
                psum dolor sit amet salami ham hock ham, hamburger corned beef
                short ribs kielbasa biltong
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.footerSections}>
                psum dolor sit amet salami ham hock ham, hamburger corned beef
                short ribs kielbasa biltong
              </Typography>
            </Grid>

            <Grid className={classes.subFooter} item xs={12}>
              <Typography className={classes.footerSections}>
                <span> Front Desk Web Chat ©{currentYear}</span>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
