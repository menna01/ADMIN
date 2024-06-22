import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

const orderStatusMap: { [key: string]: number } = {
  Accepted: 0,
  Pending: 1,
  Rejected: 2,
};
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  ID = 1;
  productName = '';
  productPrice = 0;
  productDescription = '';
  productCategory = 0;
  orderStatus = '';
  orderDate = '';
  orderRequester = '';
  order: any;
  products: any;

  constructor(
    myActivated: ActivatedRoute,
    private myService: AdminService,
    private router: Router
  ) {
    this.ID = myActivated.snapshot.params['_id'];
  }

  ngOnInit(): void {
    this.myService.getOrderByID(this.ID).subscribe({
      next: (res: any) => {
        console.log(res);
        this.order = res;
        this.products = this.order.productIds;
        this.orderStatus = res.orderStatus;
        this.orderDate = res.orderDate;
      },
      error(err) {
        console.log(err);
      },
    });
  }
  editOrder(orderStatus: any) {
    let order = {
      orderId: this.ID,
      orderStatus: orderStatusMap[orderStatus] as number,
    };

    console.log(order, this.ID);
    this.myService.UpdateOrderByID(this.ID, order).subscribe(
      () => {
        this.router.navigate(['/orders']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editOrderForm = new FormGroup({});
}
