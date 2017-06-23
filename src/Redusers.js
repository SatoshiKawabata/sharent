import { ACTIONS } from './ActionCreator';

const mockState = {
  files: {"entries": [{".tag": "folder", "name": "\u30c6\u30b9\u30c8", "path_lower": "/\u30c6\u30b9\u30c8", "path_display": "/\u30c6\u30b9\u30c8", "id": "id:6eaneMcHfzAAAAAAAAAACw"}, {".tag": "file", "name": "leapmotion_register.png", "path_lower": "/leapmotion_register.png", "path_display": "/leapmotion_register.png", "id": "id:6eaneMcHfzAAAAAAAAAABg", "client_modified": "2013-08-01T04:23:09Z", "server_modified": "2017-05-01T08:53:22Z", "rev": "35736d4b5", "size": 256136, "content_hash": "c4a3428868b7a6f601b5e49250869d3f34a814fbdac49bd52378e11b0cb232fd"}, {".tag": "file", "name": "mivieieieieie.mov", "path_lower": "/mivieieieieie.mov", "path_display": "/mivieieieieie.mov", "id": "id:6eaneMcHfzAAAAAAAAAACQ", "client_modified": "2017-04-13T04:56:08Z", "server_modified": "2017-05-06T02:15:16Z", "rev": "95736d4b5", "size": 20847899, "content_hash": "91c2b98998ca7691fe9b9809dd3aaf9f9ed3bf83dc224a787ca7e657cd4653c9"}, {".tag": "file", "name": ",2017-01-27 17.42.20.gif", "path_lower": "/,2017-01-27 17.42.20.gif", "path_display": "/,2017-01-27 17.42.20.gif", "id": "id:6eaneMcHfzAAAAAAAAAACg", "client_modified": "2017-05-07T01:12:12Z", "server_modified": "2017-05-07T01:12:13Z", "rev": "a5736d4b5", "size": 501151, "content_hash": "61da094aa43704777acee1d91035a71d70693e9c17851451c31540abae3c38e1"}], "cursor": "AAHzkz1fjJemuayXDLGVJ761hEytPixXLRoF_Sgi5nutrFY2isjnkBfAX3AD8tMGh0cVEynCi2cjy8PGLTsAHAqDSE4ZnfIdomAOaHD3jRU-7TDKDnbBa7ASDqnOaHgYSX_gNAdCJI5PiPlREwDL02m7", "has_more": false},
}

const initialState = {
  accessToken: null,
  email: null,
  password: null,
  isAuth: false, // outh認証画面を作ってから
  files: null,
  thumbnails: null,
  content: null,
  lang: 'ja',
  loading: false,
};

export default function Redusers(state = initialState, action) {
  const newState = Object.assign({}, state);
  console.log('reduce', action, state);

  switch (action.type) {

    case ACTIONS.SET_ACCESS_TOKEN:
      newState.accessToken = action.accessToken;
      return newState;

    case ACTIONS.SET_EMAIL_PASSWORD:
      newState.email = action.email;
      newState.password = action.password;
      return newState;

    case ACTIONS.ON_FILES_LIST_FOLDER:
// ここで追加日でソートしたい
      newState.files = action.res.entries;
      return newState;

    case ACTIONS.ON_FILES_GET_THUMBNAIL:
      newState.thumbnails = Object.assign({}, newState.thumbnails);
      newState.thumbnails[action.res.path_display] = action.res;
      return newState;

    case ACTIONS.ON_FILES_DOWNLOAD:
      newState.content = action.res;
      newState.loading = false;
      return newState;

    case ACTIONS.DELETE_CONTENT:
      newState.content = null;
      return newState;

    case ACTIONS.SAVE_LANG:
      newState.lang = action.lang;
      return newState;
    
    case ACTIONS.START_LOADING:
      newState.loading = true;
      return newState;
    
    case ACTIONS.STOP_LOADING:
      newState.loading = false;
      return newState;

    default:
      return newState;
  }
}