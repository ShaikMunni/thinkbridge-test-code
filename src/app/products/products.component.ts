import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private fb: FormBuilder,private productManagementService: ProductManagementService) { }
  productsList = [];
  inventoryForm: FormGroup;

  get products(): FormArray {
    if (!this.inventoryForm) {
      return null;
    }
    return this.inventoryForm.get('products') as FormArray;
  }

  ngOnInit() {
    this.createForm();
    this.getProducts();
  }

  getProducts() {
    this.productManagementService.getAllProducts().subscribe(data => {
      this.productsList = data;
      this.productsList.forEach((item) => {
        this.products.push(this.createProductForm(item.id));
      });
      this.products.patchValue(this.productsList);
    })
  }

  createForm() {
    this.inventoryForm = this.fb.group({
      products: this.fb.array([])
    })
  }

  createProductForm(id = 1): FormGroup {
    return this.fb.group({
      id: [{ value: id, disabled: false }],
      name: [{ value: '', disabled: false }, Validators.required],
      price: [{ value: '', disabled: false }, Validators.required],
      description: [{ value: '', disabled: false }, Validators.required],
    })
  }

  editProduct(product: FormGroup) {
    product.get('name').enable();
    product.get('price').enable();
    product.get('description').enable();
    this.productManagementService.updateProduct(product).subscribe(() => {
      alert("Updated Successfully.....");
    })
  }

  deleteProduct(product,index) {
    this.productsList = [];
    this.products.controls = [];
      this.productManagementService.deleteProduct(product).subscribe(() => {
        this.getProducts();
      },error => {
        alert("Didn't find the product in inventory");
        this.getProducts();
      }
    )
  }

  addProduct() {
    const id = this.products.controls.length + 1;
    this.products.push(this.createProductForm(id));
  }

  submit(){
    const model = this.inventoryForm.getRawValue();
    model.products.forEach(element => {
      this.productManagementService.addProduct(element).subscribe(() => {
        alert("Added " + element.name + " successfully");
      })
    });
  }
}
