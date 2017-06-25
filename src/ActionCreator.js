import Dropbox from 'dropbox';
import { DROP_BOX_INFO } from './consts';

export const ACTIONS = {
  // api request
  ON_FILES_LIST_FOLDER: 'onFilesListFolder',
  ON_FILES_DOWNLOAD: 'onFilesDownload',
  ON_FILES_GET_THUMBNAIL: 'onFilesGetThumbnail',
  GET_AUTHENTICATION_URL: 'getAuthenticationUrl',

  // operation
  SET_ACCESS_TOKEN: 'setAccessToken',
  SET_EMAIL_PASSWORD: 'setEmailPassword',
  DELETE_CONTENT: 'deleteContent',
  SAVE_LANG: 'saveLang',
  START_LOADING: 'start_loading',
  STOP_LOADING: 'stop_loading',
  HISTORY_BACK: 'history_back',
};

/**
 * redux ActionCreator
 */
class ActionCreator {
  _dbx:Dropbox;

  setAccessToken(accessToken:string) {
    this._dbx = new Dropbox({ accessToken, clientId: DROP_BOX_INFO.CLIENT_ID });
    return {
      type: ACTIONS.SET_ACCESS_TOKEN,
      accessToken,
    };
  }

  setEmailPassword(email:string, password:string) {
    return {
      type: ACTIONS.SET_EMAIL_PASSWORD,
      email,
      password,
    };
  }

  filesListFolder(path:string = '') {
    return dispath => {
      this._dbx.filesListFolder({ path })
        .then(res => {
          dispath({
            type: ACTIONS.ON_FILES_LIST_FOLDER,
            res,
            path,
          });
        })
        .catch(err => {
          // error
          console.log('error', err);
        });
    };
  }

  filesGetThumbnail(path:string, format:string = 'jpeg', size:string = 'w640h480') {
    return dispath => {
      this._dbx.filesGetThumbnail({ path, format, size })
        .then(res => {
          dispath({
            type: ACTIONS.ON_FILES_GET_THUMBNAIL,
            res,
          });
        })
        .catch(err => {
          // error
          console.log('error', err);
        });
    };
  }

  startLoading() {
    return {
      type: ACTIONS.START_LOADING,
    };
  }

  stopLoading() {
    return {
      type: ACTIONS.START_LOADING,
    };
  }

  filesDownload(path:string, rev:string) {
    return dispath => {
      this._dbx.filesDownload({ path, rev })
        .then(res => {
          dispath({
            type: ACTIONS.ON_FILES_DOWNLOAD,
            res,
          });
        })
        .catch(err => {
          // error
          console.log('error', err);
        });
    };
  }

  getAuthenticationUrl() {
    return dispath => {
      this._dbx.getAuthenticationUrl()
        .then(res => {
          console.log('test', res);
        });
    }
  }

  deleteContent() {
    return {
      type: ACTIONS.DELETE_CONTENT,
    };
  }

  saveLang(lang:string) {
    if (lang !== 'ja' && lang !== 'en') {
      return;
    }
    window.localStorage.setItem('lang', lang);
    return {
      type: ACTIONS.SAVE_LANG,
      lang,
    };
  }

  historyBack(pathHistory:string[]) {
    if (pathHistory.length > 1) {

      pathHistory.pop();
      const path = pathHistory[pathHistory.length - 1];

      return dispath => {
        this._dbx.filesListFolder({ path })
          .then(res => {
            dispath({
              type: ACTIONS.HISTORY_BACK,
              res,
              pathHistory,
            });
          })
          .catch(err => {
            // error
            console.log('error', err);
          });
      };
    }
  }
}

const ac = new ActionCreator();
export default ac;