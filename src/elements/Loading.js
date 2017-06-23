import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import lang from '../lang/lang';
import './Loading.css';
import LinearProgress from 'material-ui/LinearProgress';

/**
 * Loadingを表示する
 */
class Loading extends Component {
  static propTypes = {
    loading: PropTypes.bool,
  };

  constructor() {
    super();
  }

  render() {
    if (this.props.loading) {
      return this._renderLoading();
    } else {
      return null;
    }
  }

  _renderLoading() {
    return (
      <div className='loading__body'>
        <p>{lang.get('loading')}</p>
        <LinearProgress mode="indeterminate" />
      </div>
    );
  }

  static mapStateToProps(state) {
    const { loading } = state;
    return { loading };
  }

  static mapDispatchToProps(dispatch) {
    return {
    };
  }
}

export default connect(Loading.mapStateToProps, Loading.mapDispatchToProps)(Loading);