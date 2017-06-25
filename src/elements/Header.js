import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';
import AppBar from 'material-ui/AppBar';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

class Header extends Component {
  static propTypes = {
    historyBack: PropTypes.func,
    pathHistory: PropTypes.array,
  };

  constructor() {
    super();
    this._onClickBack = this._onClickBack.bind(this);
  }

  render() {
    console.log('state.pathHistory', this.props.pathHistory)

    return (<AppBar
        title={this._getPathName()}
        iconElementLeft={this._renderLeftButton()}
      />
    );
  }

  _renderLeftButton() {
    const { pathHistory } = this.props;
    if (pathHistory.length > 1) {
      return (
        <IconButton onClick={this._onClickBack}>
          <NavigationArrowBack />
        </IconButton>
      );
    } else {
      return <div />;
    }
  }

  _getPathName() {
    const { pathHistory } = this.props;
    if (pathHistory && pathHistory.length > 0) {
      const path = pathHistory[pathHistory.length - 1];
      const split = path.split('/');
      return split[split.length - 1];
    } else {
      return '';
    }
  }

  _onClickBack() {
    if (this.props.pathHistory.length > 1) {
      this.props.startLoading();
      this.props.historyBack(this.props.pathHistory);
    }
  }

  static mapStateToProps(state) {
    return {
      pathHistory: state.pathHistory,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      historyBack: (pathHistory:string[]) => {
        dispatch(ActionCreator.historyBack(pathHistory));
      },
      startLoading: (pathHistory:string[]) => {
        dispatch(ActionCreator.startLoading(pathHistory));
      },
    }
  }
}

export default connect(Header.mapStateToProps, Header.mapDispatchToProps)(Header);