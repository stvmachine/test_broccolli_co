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
import validate from "../../validate";
import isEqual from "lodash/isEqual";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "0 0 auto",
    margin: "8px 4px"
  },
  dialogActions: {
    display: "flex",
    flexDirection: "column"
  }
};

function removeByKey(myObj, deleteKey) {
  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
    }, {});
}

class RequestDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      values: {
        name: null,
        email: null,
        confirmEmail: null
      },
      errors: {
        name: "",
        email: "",
        confirmEmail: ""
      },
      formError: ""
    };

    // Store the initial state for reset the dialog
    this.baseState = Object.assign({}, this.state);
    this.handleClickSubscribe = this.handleClickSubscribe.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // The parent open/closes the dialog
    if (nextProps.open !== this.props.open) {
      this.setState({ ...this.baseState, open: nextProps.open });
    }
  }

  handleClickSubscribe = () => {
    const { name, email } = this.state.values;
    this.setState({
      formError: ""
    });
    this.auth(name, email);
  };

  handleChanges = (nameInput, event) => {
    const value = event.target.value;
    const updatedValue = {};
    updatedValue[nameInput] = value;
    this.setState({ values: { ...this.state.values, ...updatedValue } }, () => {
      const errors = validate(this.state.values);
      this.setState({ errors });
    });
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

  render() {
    const { classes } = this.props;
    const { open, values, errors, formError } = this.state;
    const canSubmit =
      values.confirmEmail &&
      values.email &&
      values.name &&
      !errors.confirmEmail &&
      !errors.email &&
      !errors.name;
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
            onChange={e => this.handleChanges("name", e)}
            required
            fullWidth
          />

          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email ? errors.email : null}
            onChange={e => this.handleChanges("email", e)}
            required
            fullWidth
          />

          <TextField
            margin="dense"
            id="confirm_email"
            label="Confirm email"
            type="email"
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail ? errors.confirmEmail : null}
            onChange={e => this.handleChanges("confirmEmail", e)}
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions classes={{ root: classes.container }}>
          <div className={classes.dialogActions}>
            <span>{formError}</span>
            <Button
              variant="contained"
              onClick={this.handleClickSubscribe}
              color="primary"
              disabled={!canSubmit}
            >
              Subscribe
            </Button>
          </div>
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
