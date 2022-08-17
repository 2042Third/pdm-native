
export default class Net {
  static async post(url:string, arg1: any, arg2:any=null){
    try {
        return fetch(
          url,
          {
            method: 'POST',
            body: arg1
          }
        );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
