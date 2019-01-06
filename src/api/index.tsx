import * as tabs from './tabs.json';

const api = (): Promise<any> => new Promise(resolve => {
  resolve(tabs)
})

export default api;