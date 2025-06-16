import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/CommandeService/commande.service';
import { History } from '../../../models/history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commandes-status',
  imports: [CommonModule],
  templateUrl: './commandes-status.component.html',
  styleUrl: './commandes-status.component.css',
})
export class CommandesStatusComponent implements OnInit {
  constructor(private commandeService: CommandeService) {}
  history:History[] = [];
  ngOnInit(): void {
    // Retrieve user information from local storage
    const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    const idUser: number = userInfo.id || '';
    this.commandeService.getHistoryByUserId(idUser).subscribe({
      next: (history) => {
        this.history = history; // Update the history with the fetched data
        console.log('Order history:', this.history); // Log the fetched history for debugging
      },
      error: (error) => {
        console.error('Error fetching order history:', error);
      },
    });
  }
}
