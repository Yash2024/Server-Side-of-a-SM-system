import { Component, OnInit } from '@angular/core';
import { pro } from '../models/pro.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProdlistService } from '../services/prodlist.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public enableview: boolean = false;
  public enableupdate: boolean = false; 
  public prod: pro = { _id: "", pid: null, pname: "", price: null, description: "" };
  public plist: pro[] = [];
  // [{pid:101,pname:"shirt",description:"assets/logo.jpeg",price:500},
  // {pid:102,pname:"shirt",description:"assets/logo.jpeg",price:500},
  // {pid:103,pname:"shirt",description:"assets/logo.jpeg",price:500}];
  constructor(private productservice: ProdlistService) {

  }

  ngOnInit(): void {
    this.productservice.getplist().subscribe((res) => {
      this.plist = res as pro[];
    },
      // (error: HttpErrorResponse)=>{
      //   console.log("Error:"+error.message)
      // }
    )
  }

  public viewproduct(pro_id: string): void {
    if (pro_id === "") {
      this.enableview = false;
    }
    if(pro_id==="")
    {
      alert("please enter product id");
    }
    else {
      this.productservice.getproductdetails(pro_id).subscribe((res) => {
        this.prod = res as pro;
        
      this.enableview=true;
      },
      (error:HttpErrorResponse)=>{
        console.error("error message");
        this.enableview=false;
        alert("Product with this Product Id does not exist");
      }
      )
      // this.prod = { _id: "", pid: null, pname: "", price: null, description: "" };
      // pro_id="";
    }
  }
  public deleteprod(pro_id:string)
  {
    this.productservice.deleteproduct(pro_id).subscribe((res)=>{
      this.productservice.getplist().subscribe((result)=>{
        this.plist = result as pro[];
      })
    })
    if(this.enableview===true)
    {
      this.enableview=false;
    }
    alert("Product Deleted Successfully")
  }
  public updateprod(pro_id:string)
  {
    this.enableupdate=true;
    if(this.enableview===true)
    {
      this.enableview=false;
    }
    this.productservice.getproductdetails(pro_id).subscribe((res) => {
      this.prod = res as pro;
    }
    )
    scrollTo(200,0); /* this fuction is used to take screen view to the top of the page*/ 
  }
  public setprod(product:pro)
  {
    this.productservice.updateproduct(product as pro).subscribe(res=>{
      this.productservice.getplist().subscribe((result)=>{
        this.plist= result as pro[];
      })
    })
    // product={ _id: "", pid: null, pname: "", price: null, description: "" };
    // this.prod={ _id: "", pid: null, pname: "", price: null, description: "" };
    alert("The Product has been Updated Successfully")
   this.enableupdate=false;
  }

}
