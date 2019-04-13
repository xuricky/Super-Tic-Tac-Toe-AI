import { HistoryData } from './action';

export interface History {
    data: HistoryData[],
    status: Status,
    time: string,  
}

enum Status {
    AIWIN = 1,
    HUMANWIN,
    NOTEND
}

export class Storage {
    static valid() {
        if (!window.localStorage) {
            alert('浏览器不支持缓存');
            return false;
        }
        return true;
    }

    static set(key: string, value: History) {
        let data = JSON.stringify(value);
        localStorage.setItem(key, data);
    }

    static get(key: string) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}