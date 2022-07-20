import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { pro } from '../models/pro.model';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProdlistService {


  

  constructor(private http:HttpClient) { }

    getplist(){
    var url = environment.apibaseurl+"/api/product/getproductList";
    return this.http.get(url);
  }
  getproductdetails(id:string){
    var url = environment.apibaseurl+"/api/product/getproduct/"+id;
    return this.http.get(url);
  }
  addproduct(product:pro){
    var url = environment.apibaseurl+"/api/product/addproduct";
    return this.http.post(
      url,
      product
      );
  }
  deleteproduct(id:string){
    var url = environment.apibaseurl+"/api/product/deleteproduct/"+id;
    return this.http.delete(url);
  }
  updateproduct(product:pro){
    var url = environment.apibaseurl+"/api/product/updateproduct/"+product._id;
    return this.http.put(
      url,
      product
      );
  }
}
