import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    balance: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (e) => {
    e.preventDefault();

    const newClient = this.state;

    const { firestore } = this.props;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }

    await firestore.add({ collection: "Clients" }, newClient);

    this.setState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      balance: "",
    });

    this.props.history.push("/");
  };

  render() {
    const { disableBalanceOnAdd } = this.props;
    const { firstName, lastName, phone, email, balance } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              {" "}
              <i className="fa fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form action="" onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  minLength="2"
                  onChange={this.onChange}
                  value={firstName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  minLength="2"
                  onChange={this.onChange}
                  value={lastName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={this.onChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  minLength="11"
                  onChange={this.onChange}
                  value={phone}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  disabled={disableBalanceOnAdd}
                  onChange={this.onChange}
                  value={balance}
                />
              </div>
              <input
                type="submit"
                value="Add"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    disableBalanceOnAdd: state.settings.disableBalanceOnAdd,
  }))
)(AddClient);
