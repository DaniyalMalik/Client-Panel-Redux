import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import classnames from "classnames";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
  state = {
    showBalanceForm: false,
    balanceAmount: "",
  };

  onDeleteClick = async () => {
    const { firestore, client } = this.props;

    await firestore.delete({ collection: "Clients", doc: client.id });

    this.props.history.push("/");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onBalanceUpdate = async (e) => {
    e.preventDefault();

    const { firestore, client } = this.props;

    const { showBalanceForm, balanceAmount } = this.state;

    const updatedBalance = {
      balance: parseFloat(balanceAmount),
    };

    await firestore.update(
      { collection: "Clients", doc: client.id },
      updatedBalance
    );

    this.setState({ showBalanceForm: !showBalanceForm });
  };

  render() {
    let balanceForm = null;
    const { showBalanceForm, balanceAmount } = this.state;
    const { client } = this.props;

    if (showBalanceForm) {
      balanceForm = (
        <form onSubmit={this.onBalanceUpdate}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceAmount"
              value={balanceAmount}
              placeholder="Add New Balance"
              onChange={this.onChange}
              required
            />
            <div className="input-group-append">
              <input
                type="submit"
                value=" Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }
    if (client) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fa fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/editclient/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={this.onDeleteClick}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h4 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-primary": client.balance < 0,
                        "text-danger": client.balance === 0,
                        "text-success": client.balance > 0,
                      })}
                    >
                      Rs{parseFloat(client.balance).toFixed(2)}{" "}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceForm: !showBalanceForm,
                          })
                        }
                      >
                        <i className="fa fa-pencil-alt" />
                      </a>
                    </small>
                  </h4>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">Email ID: {client.email}</li>
                <li className="list-group-item">Cell Number: {client.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else return <Spinner />;
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: "Clients", storeAs: "Client", doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.Client && ordered.Client[0],
  }))
)(ClientDetails);
