import StorageAccessor from './StorageAccessor';

class BooleanStorageAccessor extends StorageAccessor {
  set value(value) {
    super.value = Number(Boolean(value));
  }

  get value() {
    return Boolean(Number(super.value));
  }
}

export default BooleanStorageAccessor;
