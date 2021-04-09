import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSelectModule
} from '@angular/material';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProductManagementService } from '../services/product-management.service';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const productService = jasmine.createSpyObj('productService', ['getAllProducts', 'addProduct', 'deleteProduct', 'updateProduct'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatExpansionModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: ProductManagementService, useValue: productService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    const response = [
      {
        "id": 4,
        "name": "DDDD",
        "price": "",
        "description": ""
      },
      {
        "id": 5,
        "name": "EEEE",
        "price": "",
        "description": ""
      }
    ]
    productService.getAllProducts.and.returnValue(of(response));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit the product',() => {
    const product = new FormGroup({
      name: new FormControl('AAA'),
      description: new FormControl('AAA'),
      price: new FormControl('AAA'),
      id: new FormControl(1),
    });
    productService.updateProduct.and.returnValue(of(null));
    expect(component.editProduct(product)).toBeUndefined();
  });

  it('should delete product', () => {
    const product = {
      "id": 5,
      "name": "EEEE",
      "price": "",
      "description": ""
    }
    productService.deleteProduct.and.returnValue(of({}));
    expect(component.deleteProduct(product,5)).not.toBeNull();
  });

  it('should add product', () => {
    const product = {
      "id": 5,
      "name": "EEEE",
      "price": "",
      "description": ""
    }
    productService.addProduct.and.returnValue(of(product))
    expect(component.submit()).not.toBeNull();
  })

  it('should add accordion', () => {
    component.products.controls = [];
    component.addProduct();
    expect(component.products.controls.length).toEqual(1);
  })

  it('should return null',()=>{
    component.inventoryForm = null;
    expect(component.products).toBeNull()
  })
});
