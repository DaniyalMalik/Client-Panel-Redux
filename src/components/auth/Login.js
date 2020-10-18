import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActionCreator";
import Alert from "../layout/Alert";

class Login extends Component {
  state = { email: "", password: "" };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;

    const { email, password } = this.state;

    firebase
      .login({
        email,
        password,
      })
      .then(() => notifyUser("Logged In", "success"))
      .catch((err) => notifyUser("Invalid Login Credentials", "error"));
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pt-3 pb-4">
                <span className="text-primary">
                  <i className="fa fa-lock" /> Login
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    minLength="6"
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.password}
                    required
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({ notify: state.notify }), { notifyUser })
)(Login);
