import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Material';

  constructor(private userService: UserService) {}

  userForm!: FormGroup;

  ngOnInit() {
    this.createForm();
    this.refreshTable();
    console.log(this.userForm);
  }

  createForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
    });
  }
  isEditMode = false;

  onSubmit() {
    const user = this.userForm.value;
    if (this.isEditMode && this.clickedRow?.key) {
      this.userService.updateUser(this.clickedRow.key, user).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.refreshTable();
          this.onClear();
          this.isEditMode = false;
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.userService.addUsers(user).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.refreshTable();
          this.onClear();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
  onDelete() {
    if (this.clickedRow?.key) {
      this.userService.deleteUser(this.clickedRow?.key).subscribe(
        (response) => {
          console.log('User delted successfully:', response);
          this.refreshTable();
          this.onClear();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  onClear() {
    this.isEditMode = false;
    if (this.clickedRow?.key) this.clickedRow = null;
    this.userForm.reset();
    console.log(this.userForm);
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address'];
  dataSource!: User[];

  refreshTable() {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log('Received data:', data);
        this.dataSource = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  clickedRow!: User | null;

  onRowClicked(row: User) {
    this.clickedRow = row;
    this.userForm.setValue({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      address: row.address,
    });
    this.isEditMode = true;
  }
}
