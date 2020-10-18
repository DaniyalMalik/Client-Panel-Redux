import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class Clients extends Component {
  state = {
    totalOwed: null,
    setTotalOwed: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    } else {
      return null;
    }
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users"></i> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <span className="text-primary">
                  Rs{parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                    <span
                      className={classnames({
                        "text-success": client.balance === 0,
                        "text-primary": client.balance < 0,
                        "text-danger": client.balance > 0,
                      })}
                    >
                      Rs{parseFloat(client.balance).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/clientdetails/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fa fa-chevron-circle-right"></i> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Clients",
    },
  ]),
  connect((state) => ({ clients: state.firestore.ordered.Clients }))
)(Clients);
