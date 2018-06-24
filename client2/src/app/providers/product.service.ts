import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : Http) { }

createProduct(product){
return this.http.post('http://localhost:3003/api/products',product)
}

updateProduct(id,product){
  return this.http.put('http://localhost:3003/api/products/'+id,product)
  }

  removeProduct(id){
    return this.http.delete("http://localhost:3003/api/products/"+id);
  }

getProducts(){
  
return this.http.get("http://localhost:3003/api/products");
  
}

getProduct(id){
return this.http.get('http://localhost:3003/api/products/'+id)  
}

}
