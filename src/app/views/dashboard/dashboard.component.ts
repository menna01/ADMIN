import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { AdminService, CategoryCount } from 'src/app/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  chartPieData: any = {};
  chartDoughnutData: any = {};

  chartBarData: any;

  categories: string[] = [];
  categoryCounts: CategoryCount = {};
  categoryPercentages: { [category: string]: number } = {};

  productsCount: any;
  ordersCount: any;
  categoriesCount: any;
  usersCount: any;
  malesCount: any;
  femalesCount: any;
  acceptedOrdersCount: any;
  rejectedOrdersCount: any;
  pendingOrdersCount: any;

  ///////////////////////////////////////////////////////////////////////////////////

  constructor(public myService: AdminService) {}

  private initializeChart(): void {
    const topCategories = Object.entries(this.categoryCounts)
      .sort((a, b) => b[1] - a[1]) // sort by count in descending order
      .slice(0, 7); // get the top 7 categories by count

    const data = topCategories.map(([category, count]) => count);
    this.chartBarData = {
      labels: [...this.categories].slice(0, 7),
      datasets: [
        {
          label: 'Product Counts',
          backgroundColor: '#f87979',
          data,
        },
      ],
    };

    ///////////////////////////////New///////////////////////////////////////////////
    this.chartPieData = {};
    this.chartDoughnutData = {};
    ////////////////////////////////////////////////
  }

  ngOnInit(): void {
    this.loadCategoryCounts();

    //The New items////////////////////////////////////////////////////////////////////

    this.myService.getProductsCount().subscribe(
      (count: number) => {
        this.productsCount = count;
        this.UpdateChartPieData();
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );

    this.myService.getOrdersCount().subscribe(
      (count: number) => {
        this.ordersCount = count;
        this.UpdateChartPieData();
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );
    this.myService.getAcceptedOrdersCount().subscribe(
      (count: number) => {
        this.acceptedOrdersCount = count;
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );
    this.myService.getPendingOrdersCount().subscribe(
      (count: number) => {
        this.pendingOrdersCount = count;
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );
    this.myService.getRejectedOrdersCount().subscribe(
      (count: number) => {
        this.rejectedOrdersCount = count;
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );

    this.myService.getCategoriesCount().subscribe(
      (count: number) => {
        this.categoriesCount = count;
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );

    this.myService.getUsersCount().subscribe(
      (count: number) => {
        this.usersCount = count;
        this.updateChartDoughnutData();
        this.UpdateChartPieData();
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );

    this.myService.getMalesCount().subscribe(
      (count: number) => {
        this.malesCount = count;
        this.updateChartDoughnutData();
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );

    this.myService.getFemalesCount().subscribe(
      (count: number) => {
        this.femalesCount = count;
        this.updateChartDoughnutData();
      },
      (error: any) => {
        console.error('Error retrieving products count:', error);
      }
    );
  }

  updateChartDoughnutData() {
    if (
      this.usersCount !== undefined &&
      this.malesCount !== undefined &&
      this.femalesCount !== undefined
    ) {
      this.chartDoughnutData = {
        labels: ['Males', 'Females'],
        datasets: [
          {
            backgroundColor: ['#00D8FF', '#DC3545'],
            data: [this.malesCount, this.femalesCount],
          },
        ],
      };
    }
  }

  UpdateChartPieData() {
    if (
      this.productsCount !== undefined &&
      this.usersCount !== undefined &&
      this.ordersCount !== undefined
    ) {
      this.chartPieData = {
        labels: ['Products', 'Users', 'Orders'],
        datasets: [
          {
            data: [this.productsCount, this.usersCount, this.ordersCount],
            backgroundColor: ['#F87979', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
    }
  }

  private loadCategoryCounts(): void {
    this.myService.getCountProductsInEachCategory().subscribe(
      (categoryCounts: CategoryCount) => {
        this.categoryCounts = categoryCounts;
        this.categories = Object.keys(categoryCounts); // Update the categories array
        this.myService.getProductsCount().subscribe(
          (totalCount: number) => {
            this.updateChartBarData();
            this.calculateCategoryPercentages(totalCount);
          },
          (error) => {
            console.error('Failed to load total count of products:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to load category counts:', error);
      }
    );
  }

  private updateChartBarData(): void {
    this.myService.getProductsCount().subscribe(
      (totalCount: number) => {
        this.myService.getCountProductsInEachCategory().subscribe(
          (categoryCounts: CategoryCount) => {
            this.categoryCounts = categoryCounts;

            const topCategories = Object.entries(this.categoryCounts)
              .sort((a, b) => b[1] - a[1]) // sort by count in descending order
              .slice(0, 7); // get the top 7 categories by count

            const data = topCategories.map(([category, count]) => count);
            this.chartBarData = {
              labels: topCategories
                .map(([category, count]) => category)
                .slice(0, 7),
              datasets: [
                {
                  label: 'Product Counts',
                  backgroundColor: '#f87979',
                  data,
                },
              ],
            };

            this.calculateCategoryPercentages(totalCount);
          },
          (error) => {
            console.error('Failed to load category counts:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to load total count of products:', error);
      }
    );
  }
  private calculateCategoryPercentages(totalCount: number): void {
    for (const category in this.categoryCounts) {
      const count = this.categoryCounts[category];
      const percentage = (count / totalCount) * 100;
      this.categoryPercentages[category] = percentage;
    }
  }
}
