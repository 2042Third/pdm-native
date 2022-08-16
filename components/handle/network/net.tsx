import { Component } from "react";

export default class Net {
  static async post(url:string, arg1: any, arg2:any=null){
    try {
      const response = await fetch(
        url,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: arg1
        }
      );
      const json = await response.json();
      return json.movies;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


}
