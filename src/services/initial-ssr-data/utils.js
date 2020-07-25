class InitialSSRData {
  constructor(preloadedData = {}) {
    this.data = preloadedData;
  }

  clearDataByKey = (key) => {
    const { [key]: removableItem, ...rest } = this.data;
    this.data = rest;
  }
}

// eslint-disable-next-line import/prefer-default-export
export function initSSRContextValue(preloadedData) {
  return new InitialSSRData(preloadedData);
}
