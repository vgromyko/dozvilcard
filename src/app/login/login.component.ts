import { Component, ViewChild , AfterViewInit , EventEmitter, Input ,Output} from '@angular/core';

import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxPasswordInputComponent } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons/angular_jqxbuttons';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { jqxExpanderComponent } from 'jqwidgets-ng/jqxexpander';

import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm',{static:false}) loginForm: jqxExpanderComponent;
  @ViewChild('mylogin',{static:false}) mylogin: jqxInputComponent;
  @ViewChild('password',{static:false}) password: jqxPasswordInputComponent;
  @ViewChild('lgnbutton',{static:false}) lgnbutton: jqxButtonComponent ;
  @ViewChild('loginValidatorReference',{static:false}) loginValidatorReference: jqxValidatorComponent;

  constructor(private accountService: AccountService) { }

//  public tokenValue : any = null ;
  //public token: any = null ;
  public apimess: any = null;
  public theme: string ="base";

    ngAfterViewInit(): void {
        // this.myPasswordInput.refresh();
      this.mylogin.createComponent(this.mylogin);
      this.password.createComponent(this.password);
      this.lgnbutton.createComponent(this.lgnbutton);
     // this.crtaccbutton.createComponent(this.crtaccbutton);
      this.loginValidatorReference.createComponent(this.loginValidatorReference);
    }
    rules: any[] = [
      { input: "#mylogin", message: "Login is required!", action: 'keyup, blur', rule: 'required' }
    ];
    
    @Input() public isCreate = false  ;
    @Output() public isCreateChange = new EventEmitter();

    buttonClicked(): void {
      this.checkLogin();
       //console.log( event );
    };

    createAccountClicked(): void {
        this.isCreateChange.emit(true);
    };

    @Input() public token  ;
    @Output() public tokenChange = new EventEmitter();
    @Output() public loginDataChange = new EventEmitter();
       
  checkLogin(){
      this.accountService.checkLogin( this.mylogin.val() , this.password.val() )
        .subscribe((data)=>{
          if( data.data.token ) {
            this.token = data.data.token;
            this.apimess  = data.mess;
            this.tokenChange.emit(this.token);
            this.loginDataChange.emit(data.data.data);
            this.loginValidatorReference.validate(document.getElementById('loginForm'));
          } else {
            this.loginForm.setContent('<span style="margin:20px;color:red;font-weight:bold;">' + data.mess + '</span>');
          }

        });
      }

    validationSuccess(event: any): void {
    //  console.log(event);
      this.loginForm.setContent('<span style="margin:20px;color:green;font-weight:bold;">'+this.apimess+'</span>');
  };

}


