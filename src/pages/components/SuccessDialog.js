import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "0 0 auto",
    margin: "8px 4px"
  },
  buttonSuccess: {
    color: "white"
  }
};

class SuccessDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // The parent open/closes the dialog
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Dialog open={open} onClose={this.props.handler}>
        <DialogTitle>All done!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be one of the firsts to experience Broccolli & Co. when we
            launch.
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: classes.container }}>
          <Button
            variant="contained"
            onClick={this.props.handler}
            color="secondary"
            className={classes.buttonSuccess}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SuccessDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired
};

export default withStyles(styles)(SuccessDialog);
