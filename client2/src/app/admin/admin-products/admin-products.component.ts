import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ProductService } from '../../providers/product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
private products : any[]=[];
private imagePath:string="";
  constructor(private _sanitizer: DomSanitizer,private http : Http,private productService : ProductService) { }

getProducts(){
  this.productService.getProducts().subscribe(
(res)=>{
  console.log('The response is ',res)
  this.products = res.json();
},
(err)=>{
  console.log(err)
}

)
}
getImage(url)
{
  this.http.get("http://localhost:3003/api/readpic/"+url).subscribe(
(res)=>{
  console.log('The mega response is ',res)

  // this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
  // + res);


},
(err)=>{
  console.log('The error is ',err)
})
}
delProduct(id){
  console.log('The delete id is ',id)
if(confirm('Do you want to delete ?')){
  this.productService.removeProduct(id).subscribe(
    (res)=>{
      console.log('Product Deleted ')
      this.getProducts();
    },
    (err)=>{
      console.log(err)
    }
    
    )
}
}

  ngOnInit() {
this.getProducts();
  }

}
