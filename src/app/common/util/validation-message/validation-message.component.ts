import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input()
  placeHolder: string = '';
  @Input()
  errorMsg: string = 'Invalid';
  @Input('class')
  cssClass = 'text-danger error-msg m-0 p-0';
  @Input()
  abstractController: AbstractControl | any;


  constructor() { 
  }

  ngOnInit(): void {}

  /**
   * Used to display validation error messages
   * @returns string|void
   */

  public displayValidationMessage(): string | void {
    
    const controller: AbstractControl = this.abstractController;
    if (controller?.invalid && controller?.touched) {
      if (controller.errors?.['required']) {
        return this.placeHolder + ' is required';

      } else if (controller.errors?.['minlength']) {
        return this.placeHolder + ' minimum length is ' + controller.errors?.['minlength'].requiredLength;
      } else if (controller.errors?.['maxlength']) {
        return this.placeHolder + ' maximum length is ' + controller.errors?.['maxlength'].requiredLength
      } else {
        return this.placeHolder + ' is ' + this.errorMsg
      }
    }

  }

}
