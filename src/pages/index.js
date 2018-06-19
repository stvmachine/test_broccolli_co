import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
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
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "0 0 auto",
    margin: "8px 4px"
  }
});

class Index extends React.Component {
  state = {
    open: false,
    name: null,
    email: null,
    confirmEmail: null
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  handleClickSubscribe = () => {
    const { name, email } = this.state;
    this.auth( name, email);
  };

  auth = (name, email) => {
    api
      .postRequest({
        name,
        email
      })
      .then(response => {
        console.log(response);
      });
  };

  updateName = event => {
    this.setState({
      name: event.target.value
    });
  };

  updateEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  updateConfirmEmail = event => {
    this.setState({
      confirmEmail: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Request an invite</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full name"
              type="string"
              onChange={this.updateName.bind(this)}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              onChange={this.updateEmail.bind(this)}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="confirm_email"
              label="Confirm email"
              type="email"
              onChange={this.updateConfirmEmail.bind(this)}
              fullWidth
            />
          </DialogContent>
          <DialogActions classes={{ root: classes.container }}>
            <Button
              variant="contained"
              onClick={this.handleClickSubscribe}
              color="primary"
            >
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          A better way to enjoy every day
        </Typography>
        <Typography variant="subheading" gutterBottom>
          be the first to know when we launch
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClick}
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
