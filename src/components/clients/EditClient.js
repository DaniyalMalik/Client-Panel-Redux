import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: '',
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  static getDerivedStateFromProps(props, state) {
    const { client } = props;

    if (client) {
      const { firstName, lastName, email, phone, balance } = client;

      return {
        firstName,
        lastName,
        phone,
        email,
        balance,
      };
    } else {
      return null;
    }
  }

  onUpdateClick = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, balance } = this.state;

    const { firestore, client } = this.props;

    const updatedClient = {
      firstName,
      lastName,
      phone,
      email,
      balance: balance === '' ? 0 : balance,
    };

    await firestore.collection('Clients').doc(client.id).update(updatedClient);

    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      balance: '',
    });

    this.props.history.push('/');
  };

  render() {
    const { client, disableBalanceOnEdit } = this.props;
    const { firstName, lastName, email, phone, balance } = this.state;

    if (client) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/' className='btn btn-link'>
                {' '}
                <i className='fa fa-arrow-circle-left' /> Back to Dashboard
              </Link>
            </div>
          </div>
          <div className='card'>
            <div className='card-header'>Edit Client</div>
            <div className='card-body'>
              <form onSubmit={this.onUpdateClick}>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    className='form-control'
                    minLength='2'
                    onChange={this.onChange}
                    value={firstName}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    className='form-control'
                    minLength='2'
                    onChange={this.onChange}
                    value={lastName}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    onChange={this.onChange}
                    value={email}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input
                    type='text'
                    name='phone'
                    className='form-control'
                    minLength='11'
                    onChange={this.onChange}
                    value={phone}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='balance'>Balance</label>
                  <input
                    type='text'
                    name='balance'
                    className='form-control'
                    disabled={disableBalanceOnEdit}
                    onChange={this.onChange}
                    value={balance}
                  />
                </div>
                <input
                  type='submit'
                  value='Update'
                  className='btn btn-primary btn-block'
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: 'Clients', storeAs: 'Client', doc: props.match.params.id },
  ]),
  connect((state, props) => ({
    client: state.firestore.ordered.Client && state.firestore.ordered.Client[0],
    disableBalanceOnEdit: state.settings.disableBalanceOnEdit,
  }))
)(EditClient);
