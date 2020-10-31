import StorageAccessor from './StorageAccessor';

class BooleanStorageAccessor extends StorageAccessor {
    private value: number;
    set value(value: boolean) {
        this.value = Number(Boolean(value));
    }

    get value() {
        return Boolean(Number(this.value));
    }
}

export default BooleanStorageAccessor;
