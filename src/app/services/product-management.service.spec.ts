import { TestBed ,inject} from '@angular/core/testing';

import { ProductManagementService } from './product-management.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ProductManagementService', () => {
  let controller: HttpTestingController;
  let service: ProductManagementService;
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers: [ProductManagementService],
  }));
  beforeEach(() => {
    service = TestBed.get(ProductManagementService);
    controller = TestBed.get(HttpTestingController);
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all prducts', () => {
    service.getAllProducts().subscribe();
    const request = controller.expectOne(`http://localhost:3000/productsList`);
    expect(request.request.method).toEqual('GET');
    const mockResponse = [];
    request.flush(mockResponse);
  });

  it('should get all prducts', () => {
    service.addProduct('').subscribe();
    const request = controller.expectOne(`http://localhost:3000/productsList`);
    expect(request.request.method).toEqual('POST');
    const mockResponse = [];
    request.flush(mockResponse);
  });

  it('should get all prducts', () => {
    const product = {
      value: {
        "id": 9,
        "name": "EEEE",
        "price": "",
        "description": ""
      }
    }
    service.deleteProduct(product).subscribe();
    const request = controller.expectOne(`http://localhost:3000/productsList/`+ product.value.id);
    expect(request.request.method).toEqual('DELETE');
    const mockResponse = [];
    request.flush(mockResponse);
  });

  it('should update prduct', () => {
    const product = {
      value: {
        "id": 9,
        "name": "EEEE",
        "price": "",
        "description": ""
      }
    }
    service.updateProduct(product).subscribe();
    const request = controller.expectOne(`http://localhost:3000/productsList/`+ product.value.id);
    expect(request.request.method).toEqual('PUT');
    const mockResponse = [];
    request.flush(mockResponse);
  });
});
