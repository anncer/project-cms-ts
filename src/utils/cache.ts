import Cookies from "js-cookie";
enum Types {
  local = "localStorage",
  session = "sessionStorage",
  cookie = "cookie"
}

class LocalCache {
  setCache(key: string, value: any, type: Types) {
    if (type === Types.session) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } else if (type === Types.local) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      Cookies.set(key, value);
    }
  }

  getCache(key: string, type: Types) {
    let value: string;
    if (type === Types.session) {
      value = window.sessionStorage.getItem(key) || "";
    } else if (type === Types.local) {
      value = window.localStorage.getItem(key) || "";
    } else {
      value = String(Cookies.get(key));
    }
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string, type: Types) {
    if (type === Types.session) {
      window.sessionStorage.removeItem(key);
    } else if (type === Types.local) {
      window.localStorage.removeItem(key);
    } else {
      Cookies.remove(key);
    }
  }
}

export default new LocalCache();
