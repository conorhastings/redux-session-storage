export const get = ({key}) =>  sessionStorage.getItem(key);
export const set = ({key, data}) => sessionStorage.setItem(key, data);
export const remove = ({key}) => sessionStorage.removeItem(key);