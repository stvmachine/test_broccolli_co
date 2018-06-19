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

// const messageErrors = {
//   isRequired: 'Is required',
//   formatNotValid: 'Format not valid'
// }

class RequestDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: null,
      email: null,
      confirmEmail: null,
      formError: "",
      errors: {
        name: false,
        email: false,
        confirmEmail: false
      }
    };

    // Store the initial state for reset the dialog
    this.baseState = Object.assign({}, this.state);
  }

  componentWillReceiveProps(nextProps) {
    // The parent open/closes the dialog
    if (nextProps.open !== this.props.open) {
      this.setState({...this.baseState, open: nextProps.open});
    }
  }

  handleClickSubscribe = () => {
    const { name, email } = this.state;
    this.setState({
      formError: ""
    });
    this.auth(name, email);
  };

  auth = (name, email) => {
    api
      .postRequest({
        name,
        email
      })
      .then(response => {
        if (response.success) {
          this.props.handler(response);
        } else {
          this.setState({
            formError: response.message
          });
        }
      });
  };

  updateName = event => {
    const name = event.target.value;
    if (name && name.length >= 3) {
      this.setState(prevState => ({
        name,
        errors: {
          ...prevState.errors,
          name: null
        }
      }));
    } else {
      this.setState(prevState => ({
        name,
        errors: {
          ...prevState.errors,
          name: "Minimun length accepted is 3 chars."
        }
      }));
    }
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
    const { open, errors, formError } = this.state;

    return (
      <Dialog open={open} onClose={this.props.handler}>
        <DialogTitle>Request an invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Full name"
            type="string"
            error={!!errors.name}
            helperText={errors.name ? errors.name : null}
            onChange={this.updateName.bind(this)}
            required
            fullWidth
          />

          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            error={!!errors.email}
            onChange={this.updateEmail.bind(this)}
            required
            fullWidth
          />

          <TextField
            margin="dense"
            id="confirm_email"
            label="Confirm email"
            type="email"
            error={!!errors.confirmEmail}
            onChange={this.updateConfirmEmail.bind(this)}
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions classes={{ root: classes.container }}>
          <span>{formError}</span>
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
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired
};

export default withStyles(styles)(RequestDialog);
