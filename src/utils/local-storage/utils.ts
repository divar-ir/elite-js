import {isServerSide} from '../../utils/env';

type IValue = undefined | string | null

export function getItem(key: string): IValue {
    if (isServerSide()) {
        return undefined;
    }

    return localStorage.getItem(key);
}

export function setItem(key: string, value: boolean): void {
    if (!isServerSide()) {
        localStorage.setItem(key, String(value));
    }
}

export function removeItem(key: string): void {
    if (!isServerSide()) {
        localStorage.removeItem(key);
    }
}
