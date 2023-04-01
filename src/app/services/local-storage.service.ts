import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, data: any){
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error)
    }
  }

  get(key: string){
    try {
      let data = localStorage.getItem(key);
      return JSON.parse(data=== null?'':data);
    } catch (error) {
      console.log(error)
    }
  }

  remove(key: string){
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error)
    }
  }

  clear(){
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error)
    }
  }
}
