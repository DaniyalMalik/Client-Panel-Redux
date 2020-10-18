import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = (props) => {
  const { message, messageType } = props;

  return (
    <div
      className={classnames("alert alert-dismissible", {
        "alert-success": messageType === "success",
        "alert-danger": messageType === "error",
      })}
    >
      <a href="#!" class="close" data-dismiss="alert" aria-label="close">
        &times;
      </a>
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};

export default Alert;
