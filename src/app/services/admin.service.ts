import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface CategoryCount {
  [categoryName: string]: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private myClient: HttpClient) {}
  private baseURL = 'https://localhost:7032/api';
  private productURL = 'https://localhost:7032/api/Product';
  private orderURL = 'https://localhost:7032/api/Orders';
  private userURL = 'https://localhost:7032/api/User';
  private categoryURL = 'https://localhost:7032/api/Category';

  //Methods

  // 1)Get All Products
  getAllProducts() {
    return this.myClient.get(this.productURL);
  }

  // 2)Get Student By ID
  getProductByID(id: any) {
    return this.myClient.get(`${this.productURL}/${id}`);
  }

  getProductsCount(): Observable<number> {
    return this.myClient.get<number>(`${this.productURL}/countall`);
  }

  // 3)Update Student By ID
  UpdateProductByID(id: any, editedProduct: any) {
    return this.myClient.patch(`${this.productURL}/${id}`, editedProduct);
  }

  AddNewProduct(newProduct: any) {
    return this.myClient.post(this.productURL, newProduct);
  }

  deleteProduct(id: any) {
    return this.myClient.delete(`${this.productURL}/${id}`);
  }

  /*Order operations */
  getAllOrders() {
    return this.myClient.get(this.orderURL);
  }
  getOrdersCount() {
    return this.myClient.get<number>(`${this.orderURL}/countall`);
  }
  getAcceptedOrdersCount() {
    return this.myClient.get<number>(`${this.orderURL}/countaccepted`);
  }
  getRejectedOrdersCount() {
    return this.myClient.get<number>(`${this.orderURL}/countrejected`);
  }
  getPendingOrdersCount() {
    return this.myClient.get<number>(`${this.orderURL}/countpending`);
  }
  getOrderByID(id: any) {
    // return this.myClient.get(this.BaseURL+"/"+id);
    return this.myClient.get(`${this.orderURL}/${id}`);
  }
  UpdateOrderByID(id: any, editedOrder: any) {
    // return this.myClient.get(this.BaseURL+"/"+id);
    return this.myClient.patch(`${this.orderURL}/${id}`, editedOrder);
  }
  deleteOrder(id: any) {
    return this.myClient.delete(`${this.orderURL}/${id}`);
  }

  /*user operations */
  // 1)Get All Users
  getAllUsers() {
    return this.myClient.get(this.userURL);
  }
  getUsersCount() {
    return this.myClient.get<number>(`${this.userURL}/countall`);
  }

  getMalesCount() {
    return this.myClient.get<number>(`${this.userURL}/countmales`);
  }

  getFemalesCount() {
    return this.myClient.get<number>(`${this.userURL}/countfemales`);
  }

  // 2)Get User By ID
  getUserByID(id: any) {
    // return this.myClient.get(this.BaseURL+"/"+id);
    return this.myClient.get(`${this.userURL}/${id}`);
  }

  deleteUser(id: any) {
    return this.myClient.delete(`${this.userURL}/${id}`);
  }

  UpdateProductImage(id: any, image: any) {
    return this.myClient.patch(`${this.productURL}/image/${id}`, image);
  }

  getImage(id: any) {
    // return this.myClient.get(this.BaseURL+"/"+id);
    return this.myClient.get(`${this.baseURL}/image/${id}`);
  }

  getCategories() {
    return this.myClient.get(this.categoryURL);
  }
  getCategoriesCount() {
    return this.myClient.get<number>(`${this.categoryURL}/countall`);
  }

  getCountProductsInEachCategory(): Observable<CategoryCount> {
    return this.myClient.get<CategoryCount>(
      `${this.categoryURL}/countproducts`
    );
  }

  getCategoryByID(id: any) {
    return this.myClient.get(`${this.categoryURL}/${id}`);
  }
  addCategory(newCategory: any) {
    return this.myClient.post(this.categoryURL, newCategory);
  }
  UpdateCategoryById(id: any, editedCategory: any) {
    return this.myClient.patch(`${this.categoryURL}/${id}`, editedCategory);
  }

  deleteCategory(id: any) {
    return this.myClient.delete(`${this.categoryURL}/${id}`);
  }
}
