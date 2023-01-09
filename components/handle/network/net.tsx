
export default class Net {
  static async post(url:string, arg1: any, arg2:any=null){
    try {
        return fetch(
          url,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: arg1
          }
        );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
