import React from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import banner from "../resources/banner-bg.jpg";

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    background: `url(${banner}) center`,
    backgroundSize: "cover"
  }
};

class Index extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
