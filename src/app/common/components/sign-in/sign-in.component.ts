import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import { MessageService } from '../../util/message';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  public form!: FormGroup;
  invalidLogin = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    protected formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.populateForm();
    if (localStorage.getItem('user')) {
      this.authenticationService.logout();
    }
  }

  populateForm()
    :
    void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  /**
   * Check login
   */
  checkLogin() {
    this.authenticationService.basicLogin(this.form!.value).pipe(first()).subscribe({
      next: data => {
        this.authenticationService.setUser(data);
        this.router.navigateByUrl('', {replaceUrl: true, state: {isLogin: true}});
        this.invalidLogin = false;
        this.messageService.success('LOGIN_SUCCESSFUL', '');
      },
      error: error => {
        this.invalidLogin = true;
        console.log(error);
        this.messageService.error('LOGIN_FAILED', error);
      }

    });
  }

  /**
   * When press ENTER key trigger login
   *
   * @param event Get pressed key from password field
   */
  onKeydown(event: { key: string; }) {
    if (event.key === 'Enter') {
      if (this.form.valid) {
        this.checkLogin();
      } else {
        this.messageService.error('LOGIN_FAILED', 'LOGIN_INCOMPLETE');
      }
    }
  }
}

