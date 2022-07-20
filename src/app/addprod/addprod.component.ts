import { Component, OnInit } from '@angular/core';
import { pro } from '../models/pro.model';
import { ProdlistService } from '../services/prodlist.service';
@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit {

  public prod: pro = { _id: "", pid: null, pname: "", price: null, description: "" };
  public plist:pro[]=[];
  constructor(private productservice:ProdlistService) { }

  ngOnInit(): void {
    this.productservice.getplist().subscribe((result)=>{
      this.plist = result as pro[];
    })
  }

  public addprod(product:pro)
  {
    this.productservice.addproduct(product).subscribe((res)=>{
      this.productservice.getplist().subscribe((result)=>{
        this.plist = result as pro[];
      })
    })
    product={ _id: "", pid: null, pname: "", price: null, description: "" }
  }
}
