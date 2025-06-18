import { Component, AfterViewInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  // Static mock data
  totalUsers: number = 1245;
  totalProducts: number = 389;
  totalOrders: number = 876;
  totalRevenue: number = 56890;
  usersGrowth: number = 12.5;
  productsGrowth: number = 8.2;
  ordersGrowth: number = 24.7;
  revenueGrowth: number = 18.3;

  ngAfterViewInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.createSalesChart();
    this.createUsersChart();
    this.createCategoriesChart();
  }

  private createSalesChart(): void {
    const options = {
      series: [{
        name: "Sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 95, 120]
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      colors: ['#3B82F6'],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return "$ " + val + "k";
          }
        }
      }
    };
    const chart = new ApexCharts(document.querySelector("#sales-chart"), options);
    chart.render();
  }

  private createUsersChart(): void {
    const options = {
      series: [{
        name: "Users",
        data: [10, 15, 25, 30, 45, 60, 75, 90, 110, 140, 160, 200]
      }],
      chart: {
        height: 350,
        type: 'area',
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      colors: ['#10B981'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }
    };
    const chart = new ApexCharts(document.querySelector("#users-chart"), options);
    chart.render();
  }

  private createCategoriesChart(): void {
    const options = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 350,
        type: 'donut',
      },
      labels: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Arts'],
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' }
        }
      }]
    };
    const chart = new ApexCharts(document.querySelector("#categories-chart"), options);
    chart.render();
  }
}