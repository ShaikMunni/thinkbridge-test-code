import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  constructor(private http: HttpClient) { }
  products: any;

  getAllProducts(): Observable<any> {
    const url = `http://localhost:3000/productsList`
    this.products = this.http.get(url);
    return this.products;
  }

  addProduct(input): Observable<any> {
    const url = `http://localhost:3000/productsList`;
    console.log(input);
    
    return this.http.post(url, input)
  }

  deleteProduct(product): Observable<any> {
    console.log(product.value)
    const url = `http://localhost:3000/productsList/` + product.value.id;
    return this.http.delete(url);
  }

  updateProduct(product):Observable<any>{
    console.log(product);
    const url = `http://localhost:3000/productsList/`+product.value.id;
    return this.http.put(url,product.value);
  }
}
