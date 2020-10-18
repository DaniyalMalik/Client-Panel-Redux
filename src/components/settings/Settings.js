import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
} from "../../actions/settingsActionCreator";

class Settings extends Component {
  onAllowRegistrationClick = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  onDisableBalanceOnAdd = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  onDisableBalanceOnEdit = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration,
    } = this.props.settings;

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fa fa-arrow-circle-left"></i> Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration </label>{" "}
                <input
                  type="checkbox"
                  style={{ cursor: "pointer" }}
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.onAllowRegistrationClick}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add </label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  style={{ cursor: "pointer" }}
                  checked={!!disableBalanceOnAdd}
                  onChange={this.onDisableBalanceOnAdd}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Edit</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  style={{ cursor: "pointer" }}
                  checked={!!disableBalanceOnEdit}
                  onChange={this.onDisableBalanceOnEdit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
