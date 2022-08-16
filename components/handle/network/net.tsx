import { Component } from "react";

export default class Net {
  static async post(url:string, arg1: any, arg2:any=null){
    try {
      // const response = await
        return fetch(
          url,
          {
            method: 'POST',
            body: arg1
          }
        );
        //   .then(function(response){
        //   return response.json();
        // }).then(function(data){
        //   console.log(`Net return1: ${data.umail}`)
        //   console.log(`Net return2: ${JSON.stringify(data)}`)
        //   return data;
        // });
    } catch (error) {
      console.error(error);
      return null;
    }
  }


}
