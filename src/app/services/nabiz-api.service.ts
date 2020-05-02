import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {VdmcRequestService} from './vdmc-request.service';

const url = 'https://test-doping-api.vademecumonline.com.tr/';
const hash = 'YTU3YWI0NWNjOTNhZDI5ZDQ2MGE5NWEwNDIzZWFmZjM6';

@Injectable({
  providedIn: 'root'
})

export class NabizApiService {

  constructor(private http: HttpClient, private vdmcRequest: VdmcRequestService) { }

  signin (data) {

    return this.vdmcRequest.postRequest('nabiz/login',data);
  };

  prescriptions (data) {
    var postRequest = this.vdmcRequest.postRequest("nabiz/prescriptions", data);
    return postRequest;
  };

  prescriptiondetails (data) {

    var postRequest = this.vdmcRequest.postRequest("nabiz/prescription-details", data);
    return postRequest
  }
}
