import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../../common/service/authentication.service';
import { MessageService } from '../../common/util/message';
import { MatDialogRef } from '@angular/material/dialog';
import {
  getAbstractController
} from 'src/app/common/util/funtions'
import { UserService } from 'src/app/common/service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginform: FormGroup = new FormGroup({});

  invalidLogin = false;
  userForm: FormGroup = new FormGroup({});


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    protected formBuilder: FormBuilder,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<SignInComponent>,
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.populateForm();
    if (localStorage.getItem('user')) {
      this.authenticationService.logout();
    }
    this.userForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    });
  }

  populateForm()
    :
    void {
    this.loginform = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  /**
   * Check login
   */
  checkLogin() {
    this.authenticationService.basicLogin(this.loginform.value).pipe(first()).subscribe({
      next: data => {
        this.authenticationService.setUser(data);
        this.router.navigateByUrl('/dashboard', { replaceUrl: true, state: { isLogin: true } });
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
   * used to create user
   */
  userCreate() {
    this.userService.createUser(this.userForm.value).subscribe((res: any) => {
      this.router.navigateByUrl('/home', { replaceUrl: true, state: { isLogin: true } });
      this.messageService.success('User Create SuccsessFUlly', '');
    }, (error: any) => {
      console.log(error);
      this.messageService.error('somthing went wrong!User Create Failed . ', error);
    })
  }

  /**
   * When press ENTER key trigger login
   *
   * @param event Get pressed key from password field
   */
  onKeydown(event: { key: string; }) {
    if (event.key === 'Enter') {
      if (this.loginform.valid) {
        this.checkLogin();
      } else {
        this.messageService.error('LOGIN_FAILED', 'LOGIN_INCOMPLETE');
      }
    }
  }

  /**
 * for validation component
 * @param fg
 * @param fc
 */
  public getAbstractController(fg: FormGroup, fc: string) {
    return getAbstractController(fg, fc);
  }
}

