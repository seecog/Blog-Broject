import { Component, OnInit } from '@angular/core';
import { ProductService } from '../providers/product.service';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
private products : any[]=[];
private tempProducts : any[]=[];
private categories : any[]=[];
  constructor(private activatedRoute : ActivatedRoute,private http : Http,private productService : ProductService) {
    
    this.productService.getProducts().subscribe(
      (res)=>{
        console.log('The dom is ',res)
        this.products = res.json();
//filter start
this.activatedRoute.queryParamMap.subscribe(
  (res)=>{
    console.log('The response is ',res.get('category'))

this.tempProducts=this.products.filter((product)=>{
  console.log(`${product.category},${res.get('category')}`)
  return product.category==res.get('category')
})

  }
)
//filter end
        
      },
      (err)=>{
        console.log(err)
      }
      
      )
   }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get("http://localhost:3003/api/categories").subscribe(
      (res) => {
        console.log('The response is ', res.json());
        this.categories = res.json();
      },
      (err) => {
        console.log(err)
      })

  }


}
