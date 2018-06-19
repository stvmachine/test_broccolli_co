import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import RequestDialog from "./components/RequestDialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import * as api from "../api";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  },
  buttonRequest: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
});

class Index extends React.Component {
  state = {
    open: false
  };

  openRequestDialog = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <RequestDialog open={open} />
        <Typography variant="display1" gutterBottom>
          A better way to enjoy every day
        </Typography>
        <Typography variant="subheading" gutterBottom>
          be the first to know when we launch
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.openRequestDialog}
          classes={{
            root: classes.buttonRequest,
            label: classes.label
          }}
        >
          Request an invite
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
