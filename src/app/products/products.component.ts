import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

interface Product {
  id?: number;
  name: string;
  price: number;
  taxes: Tax[];
}

interface Tax {
  id: number;
  name: string;
  rate: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  // Initialize an empty array to store the list of products
  products: Product[] = []; 
  // Initialize a product object with empty name, price and taxes fields
  product: Product = { name: '', price: 0, taxes: [] };
  // Initialize a list of tax objects with their respective ids, names and rates
  taxes: Tax[] = [
    { id: 1, name: 'Sales Tax', rate: 0.1 },
    { id: 2, name: 'VAT', rate: 0.15 },
    { id: 3, name: 'GST', rate: 0.05 }
  ];

  constructor( public nav: NavbarService ) {}      
  
  ngOnInit() {
    this.nav.show();
  }

  // This function adds a new product to the products array
  addProduct() {
    this.product.id = this.products.length + 1;
    this.products.push({...this.product});
    this.product = { name: '', price: 0, taxes: [] };
  }

  // This function is called when the user clicks the Edit button on a product row
  // It sets the product object to the selected product so that the user can update it
  editProduct(product: Product) {
    this.product = {...product};
  }
   
  // This function updates an existing product in the products array
  updateProduct() {
    const index = this.products.findIndex(p => p.id === this.product.id);
    if (index !== -1) {
      this.products[index] = {...this.product};
      this.product = { name: '', price: 0, taxes: [] };
    }
  }

  // This function removes a product from the products array
  removeProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  // This function checks if a product object includes a specified tax object
  isTaxIncluded(product: Product, tax: Tax): boolean {
    return product.taxes.some(t => t.id === tax.id);
  }
    
  // This function adds a specified tax object to a specified product object's taxes array
  assignTax(product: Product, tax: Tax) {
    if (!this.isTaxIncluded(product, tax)) {
      product.taxes.push({...tax});
    }
  }
  // This function removes a specified tax object from a specified product object's taxes array
  removeTax(product: Product, tax: Tax) {
    const index = product.taxes.findIndex(t => t.id === tax.id);
    if (index !== -1) {
      product.taxes.splice(index, 1);
    }
  }
}
