import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreator from '../ActionCreator';
import { CONTENT_TYPE } from '../consts';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import lang from '../lang/lang';
import './Content.css';

/**
 * コンテンツを表示する
 */
class Content extends Component {
  static propTypes = {
    content: PropTypes.object,
    deleteContent: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      type: null,
      src: null,
      isDialogOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { content } = nextProps;
    if (content) {
      const blobUrl = window.URL.createObjectURL(content.fileBlob);
      let type;
      if (content.media_info && content.media_info.metadata && content.media_info.metadata['.tag'] === CONTENT_TYPE.VIDEO) {
          type = CONTENT_TYPE.VIDEO;
      } else {
        type = CONTENT_TYPE.IMAGE;
      }
      this.setState({
        src: blobUrl,
        type,
      });
    }
    this.setState({
      isDialogOpen: !!content,
    });
  }

  componentWillMount() {
    const { content } = this.props;
    if (content) {
      const blobUrl = window.URL.createObjectURL(content.fileBlob);
      let type;
      if (content.media_info && content.media_info.metadata && content.media_info.metadata['.tag'] === CONTENT_TYPE.VIDEO) {
          type = CONTENT_TYPE.VIDEO;
      } else {
        type = CONTENT_TYPE.IMAGE;
      }
      this.setState({
        src: blobUrl,
        type,
      });
    }
  }

  render() {
    const { name, server_modified: modifieddate } = this.props.content || {};
    const { isDialogOpen } = this.state;
    return (
      <Dialog
          title={name}
          modal={false}
          actions={this._renderDialogActions()}
          autoScrollBodyContent={true}
          open={isDialogOpen}
          contentStyle={{ width: '90vw', maxWidth: 'none', height: '90vh' }}
          repositionOnUpdate={true}
        >
        <div>
          <p>{lang.get('addDate')} {modifieddate}</p>
          { this._renderContent() }
        </div>
      </Dialog>
    );
  }

  _renderContent() {
    const { src, type } = this.state;
    if (type === CONTENT_TYPE.VIDEO) {
      return <video className='content__body' src={src} controls={true} autoPlay={true} />;
    } else {
      return <img className='content__body' src={src} />;
    }
  }

  _renderDialogActions() {
    const actions = [
      <FlatButton
        label={lang.get('close')}
        primary={true}
        onTouchTap={this._onClickClose.bind(this)}
      />,
    ];
    return actions;
  }

  _onClickClose(e) {
    this.props.deleteContent();
  }

  static mapStateToProps(state) {
    const { content } = state;
    return { content };
  }

  static mapDispatchToProps(dispatch) {
    return {
      deleteContent: () => {
        dispatch(ActionCreator.deleteContent());
      },
    }
  }
}

export default connect(Content.mapStateToProps, Content.mapDispatchToProps)(Content);