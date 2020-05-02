import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersports = [];
  tckimlikno = null;
  accesstoken = null;
  tckimliknohash = null;
  constructor(private storage: Storage) { }

  async isAuthenticated() {
    let token = await this.storage.get('AccessToken');
    let tckNo = await this.storage.get('TCKimlikNo');
    
    if(!token && !tckNo){
      console.log(token,tckNo);
      return false;
    } 
    return true;
  };

  async isRegistered() {
    if (await this.storage.get('isRegistered') == 0) {
      return false;
    } else if (await this.storage.get('isRegistered') == 1) {
      return true;
    }
    return false;
  }

  signout() {
    this.storage.remove('AccessToken');
    this.storage.remove('TCKimlikNo');
    this.storage.remove('TCKimlikNoHash');
    this.storage.remove("isRegistered");
    this.storage.remove("profilename");
    this.storage.remove("profilesurname");
    this.storage.remove("profilephoto");
    this.storage.remove("usersports");
    this.usersports = [];
    this.tckimlikno = null;
    this.accesstoken = null;
    this.tckimliknohash = null;
  }
}
