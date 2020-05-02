import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {DialogService} from './dialog.service';
const liveUrl = "https://test-doping-api.vademecumonline.com.tr/";
const devUrl = "https://test-doping-api.vademecumonline.com.tr/"
// const devUrl = "/api/";
const hash = 'YTU3YWI0NWNjOTNhZDI5ZDQ2MGE5NWEwNDIzZWFmZjM6';
var development = true;
var basicAuth = true;

@Injectable({
  providedIn: 'root'
})
export class VdmcRequestService {

  constructor(private http: HttpClient, private dlgService: DialogService) { }

  getRequest (uri) {

    if (development == false) {
      var url = liveUrl + uri;
    } else {
      var url = devUrl + uri;
    }

    var headers = {};
    if (basicAuth == true) {
      headers = {'Authorization': 'Basic ' + hash};
    } 
    const httpOption = {
      headers: new HttpHeaders(headers)
    };

    return this.http.get(url, httpOption);
  };

  postRequest (uri, data) {
    if (development == false) {
      var url = liveUrl + uri;
    } else {
      var url = devUrl + uri;
    }
    var headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if (basicAuth == true) {
      headers = headers.append('Authorization', 'Basic YTU3YWI0NWNjOTNhZDI5ZDQ2MGE5NWEwNDIzZWFmZjM6');
    }
    const httpOption = {
      headers: headers
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic YTU3YWI0NWNjOTNhZDI5ZDQ2MGE5NWEwNDIzZWFmZjM6'
      })
    };

    return this.http.post(url, data, httpOptions).pipe(catchError(this.handleError('prescriptiondetails', [])));
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      this.dlgService.showAlert(null, null, "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
