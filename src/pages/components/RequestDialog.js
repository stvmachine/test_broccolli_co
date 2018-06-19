import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as api from "../../api";
import { withStyles } from "@material-ui/core/styles";

const styles = {
 container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "0 0 auto",
    margin: "8px 4px"
  }
};

class RequestDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: null,
      email: null,
      confirmEmail: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.open });  
  }

  handleClickSubscribe = () => {
    const { name, email } = this.state;
    this.auth(name, email);
  };

  handleClose = () => {
    this.setState({
      open: false
    });
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
      <Dialog open={open} onClose={this.handleClose}>
        <DialogTitle>Request an invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
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
    );
  }
}

RequestDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestDialog);
