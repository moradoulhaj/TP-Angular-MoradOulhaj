import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/UserService/user-service.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}
  users: User[] = [];
  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users retrieved:', this.users);
      },
      error: (error) => {
        console.error('Error retrieving users:', error);
      },
    });
  }
  editUser(user: User): void {
    // Implement edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
        console.log('User deleted:', userId);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }
  
}
