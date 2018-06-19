import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import RequestDialog from "./RequestDialog";
import SuccessDialog from "./SuccessDialog";
import withRoot from "../../withRoot";

const styles = theme => ({
  content: {
    marginTop: theme.spacing.unit * 20,
    marginBottom: theme.spacing.unit * 20,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 10px"
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
  title: {
    color: "white"
  },
  subHeading: {
    color: "white",
    paddingBottom: "20px"
  }
});

class Content extends React.Component {
  constructor() {
    super();

    this.state = {
      showRequestDialog: false,
      showSuccessDialog: false
    };

    this.handleRequestDialog = this.handleRequestDialog.bind(this);
    this.handleSuccessDialog = this.handleSuccessDialog.bind(this);
  }

  handleRequestDialog = event => {
    // Could receive generic Event on click or an object {success: boolean, message: string}
    this.setState(prevState => ({
      showRequestDialog: !prevState.showRequestDialog
    }));

    if (event.success && event.message) {
      this.setState({
        showSuccessDialog: true
      });
    }
  };

  handleSuccessDialog = () => {
    this.setState(prevState => ({
      showSuccessDialog: !prevState.showSuccessDialog
    }));
  };

  render() {
    const { classes } = this.props;
    const { showRequestDialog, showSuccessDialog } = this.state;
    return (
      <div className={classes.content}>
        <RequestDialog
          open={showRequestDialog}
          handler={this.handleRequestDialog}
        />
        <SuccessDialog
          open={showSuccessDialog}
          handler={this.handleSuccessDialog}
        />
        <Typography className={classes.title} variant="display1" gutterBottom>
          {"A better way to enjoy every day"}
        </Typography>
        <Typography
          className={classes.subHeading}
          variant="subheading"
          gutterBottom
        >
          {"be the first to know when we launch"}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.setState({ showRequestDialog: true })}
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

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Content));
