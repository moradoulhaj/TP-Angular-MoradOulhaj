import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/CommandeService/commande.service';
import { History } from '../../../models/history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private commandeService: CommandeService) {}
  orders: History[] = []; // Initialize orders as an empty array
  ngOnInit(): void {
    this.commandeService.getAllHistory().subscribe({
      next: (data) => {
        this.orders = data; // Update the orders array with fetched data
        console.log('Orders retrieved:', this.orders);
      },
      error: (error) => {
        console.error('Error retrieving orders:', error);
      },
    });
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1:
        return 'Completed';
      case 0:
        return 'Processing';
      case -1:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
  viewOrder(order: History): void {
    // Implement view functionality
    console.log('View order:', order);
  }

  editOrder(order: History): void {
    // Implement edit functionality
    console.log('Edit order:', order);
  }

  deleteOrder(orderId: number): void {
    console.log('Delete order locally:', orderId);
  
    // Update the orders array with a new reference after filtering
    this.orders = this.orders.filter((order) => order.id !== orderId);
  
    console.log('Updated orders list:', this.orders);
  }
}
