import ja from './ja';
import en from './en';

class Lang {
  lang;

  setEnv(env) {
    this.lang = env === 'en' ? en : ja;
  }

  get(type):string {
    return this.lang[type];
  }
}

const l = new Lang();

export default l;