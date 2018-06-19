import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../../withRoot";
import logoImg from "../../resources/logo.png";

const styles = {
  logo: {
    height: "35px",
    marginRight: "6px"
  }
};

class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <img alt="logo" className={classes.logo} src={logoImg} />
          <Typography variant="title" color="inherit">
            BROCOLLI & CO.
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Header));
