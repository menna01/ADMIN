import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

const orderStatusMap: { [key: number]: string } = {
  0: 'Accepted',
  1: 'Pending',
  2: 'Rejected',
};

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(public myService: AdminService) {}

  orders: any;
  ngOnInit(): void {
    this.myService.getAllOrders().subscribe({
      next: (res) => {
        // console.log(res)
        this.orders = res;
        // console.log(this.students)
      },
      error(err) {
        console.log(err);
      },
    });
  }

  getStatusString(status: number): string {
    return orderStatusMap[status] as string;
  }

  delete(id: any) {
    var res = confirm('Do you want to delete this order?');
    // console.log(res);
    if (res) {
      this.myService.deleteOrder(id).subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
