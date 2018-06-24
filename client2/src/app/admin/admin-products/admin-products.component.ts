import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ProductService } from '../../providers/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
private products : any[]=[];
  constructor(private http : Http,private productService : ProductService) { }

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
