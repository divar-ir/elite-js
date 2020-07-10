import StorageAccessor from './StorageAccessor';

class JSONStorageAccessor extends StorageAccessor {
  set value(value) {
    super.value = JSON.stringify(value);
  }

  get value() {
    return JSON.parse(super.value || null);
  }
}

export default JSONStorageAccessor;
