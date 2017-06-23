import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';

class Template extends Component {
  static propTypes = {
    setAccessToken: PropTypes.func,
  };
  render() {
    return (<div>あ</div>);
  }

  static mapStateToProps(state) {
    return state;
  }

  static mapDispatchToProps(dispatch) {
    return {
      setAccessToken: (accessToken:string) => {
        dispatch(ActionCreator.setAccessToken(accessToken));
      },
    }
  }
}

export default connect(Template.mapStateToProps, Template.mapDispatchToProps)(Template);