import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Link to="/addclient" className="btn btn-success btn-block">
      <i className="fas fa-plus" /> New
    </Link>
  );
};
