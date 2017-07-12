// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import Auth from './Auth';
import Container from './Container';
import ActionCreator from '../ActionCreator';
import qs from 'querystring';
import lang from '../lang/lang'

class App extends Component {
  static propTypes = {
    accessToken: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    lang: PropTypes.string,
    setAccessToken: PropTypes.func.isRequired,
    setEmailPassword: PropTypes.func.isRequired,
    saveLang: PropTypes.func.isRequired,
  }

  _query:Object;

  componentWillMount() {
    const seed = window.location.search ? window.location.search.slice(1) : window.location.hash.slice(1);
    this._query = qs.parse(seed);
    this._parseAuth();
    this._parseLang();
  }

  componentWillReceiveProps(nextProps) {
    const { lang: l } = nextProps;
    lang.setEnv(l);
  }

  render() {
    return (
      <div className="App">
        { this._renderContainer() }
      </div>
    );
  }

  _renderContainer() {
    const { accessToken } = this.props;
    if (accessToken) {
      return (<Container />);
    } else {
      return (<Auth />);
    }
  }

  _parseAuth() {
    const {
      access_token: accessToken,
      email,
      password,
    } = this._query;
    if (accessToken) {
      this.props.setAccessToken(accessToken);
    // } else if (email && password) {
    //   // なければ、Emailとパスワードが有るか見る
    //   this.props.setEmailPassword(email, password);
    } else {
      // なければ普通にOAuth認証画面へ

    }
  }

  _parseLang() {
    const {
      lang: l,
    } = this._query;

    const storedLang = window.localStorage.getItem('lang');

    if (l) {
      this.props.saveLang(l);
    } else if (storedLang) {
      this.props.saveLang(storedLang);
    }
  }

  static mapStateToProps(state) {
    const {
      accessToken,
      email,
      password,
      lang,
    } = state;
    return {
      accessToken,
      email,
      password,
      lang,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      setAccessToken: (accessToken:string) => {
        dispatch(ActionCreator.setAccessToken(accessToken));
      },
      setEmailPassword: (email:string, password:string) => {
        dispatch(ActionCreator.setEmailPassword(email, password));
      },
      saveLang: (lang:string) => {
        dispatch(ActionCreator.saveLang(lang));
      },
    };
  }
}

// export default App;
export default connect(App.mapStateToProps, App.mapDispatchToProps)(App);