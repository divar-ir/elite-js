import {getItem, setItem, removeItem} from './utils';

class StorageAccessor {
    key: string;

    constructor(key: string) {
        this.key = key;
    }

    set value(value) {
        setItem(this.key, value);
    }

    get value() {
        return getItem(this.key);
    }

    reset() {
        removeItem(this.key);
    }
}

export default StorageAccessor;
