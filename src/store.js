import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyANmFGmHSGEv42O0-bxWtB3E56LkmIaGgI',
  authDomain: 'client-panel-3a998.firebaseapp.com',
  databaseURL: 'https://client-panel-3a998.firebaseio.com',
  projectId: 'client-panel-3a998',
  storageBucket: 'client-panel-3a998.appspot.com',
  messagingSenderId: '361283577939',
  appId: '1:361283577939:web:594ae0368bbfba34dcfea6',
  measurementId: 'G-8PMSXVYHBT',
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

if (localStorage.getItem('settings') == null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: true,
  };

  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
