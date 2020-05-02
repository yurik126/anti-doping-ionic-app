import { Injectable } from '@angular/core';
import {VdmcRequestService} from './vdmc-request.service';

@Injectable({
  providedIn: 'root'
})
export class VdmcApiService {

  constructor(private vdmcRequest: VdmcRequestService) { }

  searchproducts (data) {
    var getRequest = this.vdmcRequest.getRequest("product/search?name=" + data);
    return getRequest;
  }

  searchsubstances (data) {
    var getRequest = this.vdmcRequest.getRequest("substance/search?name=" + data);
    return getRequest;
  }

  prohibitedproducts (page, query) {
    var uri = 'prohibited-products/search?per-page=10&page=' + page;
    if (query.length > 0) {
      uri = 'prohibited-products/search?name=' + query + '&per-page=10&page=' + page;
    }
    var getRequest = this.vdmcRequest.getRequest(uri);
    return getRequest;
  }

  substancedopingdetails (id) {
    var getRequest = this.vdmcRequest.getRequest("substance/doping-info?id=" + id);
    return getRequest;
  }

  productdopingdetails (id) {
    var getRequest = this.vdmcRequest.getRequest('product/doping-info?id=' + id);
    return getRequest;
  }

  sports () {
    var getRequest = this.vdmcRequest.getRequest('sports');
    return getRequest;
  }

  education () {
    var getRequest = this.vdmcRequest.getRequest('educations');
    return getRequest;
  }

  cities () {
    var getRequest = this.vdmcRequest.getRequest('cities');
    return getRequest;
  }

  getuser (data) {
    var getRequest = this.vdmcRequest.postRequest("user/details", data);
    return getRequest;
  }

  createuser (data) {
    var getRequest = this.vdmcRequest.postRequest("user/create", data);
    return getRequest;
  }

  updateuser (data) {
    var getRequest = this.vdmcRequest.postRequest("user/update", data);
    return getRequest;
  }

  nutritions () {
    var getRequest = this.vdmcRequest.getRequest("nutrition");
    return getRequest;
  }

  nutritioninteraction (nutritions, products) {
    var getRequest = this.vdmcRequest.getRequest("interaction?nutritions" + nutritions + "&products=" + products);
    return getRequest;
  }



}
