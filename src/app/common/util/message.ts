import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar) {
  }

  success(message: string, description?: string) {
    this.snackbar.open(message ?? '' + '\n' + description ?? '', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['style-success']
    });
  }

  error(message: string, description?: string){
    this.snackbar.open(message  + '\n' + description, 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['style-error']
    });
  }
}
