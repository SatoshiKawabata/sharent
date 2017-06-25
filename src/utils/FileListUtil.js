import { FILE_TYPE } from '../consts';
import DateUtil from './DateUtil';

class FileListUtil {
  static sortByDate(entries):Array {
      const folders = entries.filter(entry => entry['.tag'] === FILE_TYPE.FOLDER);
      let files = entries.filter(entry => entry['.tag'] === FILE_TYPE.FILE);
      files = DateUtil.sortBy(files, 'client_modified');
      return [ ...folders, ...files ];
  }
}

export default FileListUtil;