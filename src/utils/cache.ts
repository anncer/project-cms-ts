import Cookies from "js-cookie";
enum Types {
  local = "localStorage",
  session = "sessionStorage",
  cookie = "cookie"
}

class LocalCache {
  setCache(key: string, value: any, type: Types) {
    if (type === Types.cookie) {
      Cookies.set(key, value);
    } else {
      window[type].setItem(key, JSON.stringify(value));
    }
  }

  getCache(key: string, type: Types) {
    let value: string;
    if (type === Types.cookie) {
      value = String(Cookies.get(key));
    } else {
      value = window[type].getItem(key) || "";
    }
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string, type: Types) {
    if (type === Types.cookie) {
      Cookies.remove(key);
    } else {
      window[type].removeItem(key);
    }
  }

  clearCache(type: Types) {
    if (type === Types.cookie) {
      document.cookie = "";
    } else {
      window[type].clear();
    }
  }
}

export default new LocalCache();
