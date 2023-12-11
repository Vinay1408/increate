export class Util {
  public static isLocal() {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development';
  }

  public static getServerUrl() {
    if (Util.isLocal()) {
      return `http://localhost:${process.env.PORT || 3000}`;
    } else {
      return ''
    }
  }
}