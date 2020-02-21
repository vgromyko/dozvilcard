import { Component, ViewChild , AfterViewInit ,  EventEmitter, Input ,Output } from '@angular/core';
 
import { jqxPasswordInputComponent } from 'jqwidgets-ng/jqxpasswordinput';
import { jqxExpanderComponent } from 'jqwidgets-ng/jqxexpander';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxValidatorComponent } from 'jqwidgets-ng/jqxvalidator';
import { jqxDropDownListComponent } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxDateTimeInputComponent } from 'jqwidgets-ng/jqxdatetimeinput' ;
//import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxButtonComponent } from 'jqwidgets-ng/jqxbuttons/angular_jqxbuttons';

import { AccountService } from '../services/account.service';


@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html'
})


export class AccountComponent implements AfterViewInit {
 // @ViewChild('myWindow', { static: false }) myWindow: jqxWindowComponent;
    @ViewChild('createAccount',{static:false}) createAccount: jqxExpanderComponent;
    @ViewChild('firstName',{static:false}) firstName: jqxInputComponent;
    @ViewChild('lastName',{static:false}) lastName: jqxInputComponent;
    @ViewChild('userName',{static:false}) userName: jqxInputComponent;
    @ViewChild('password',{static:false}) password: jqxPasswordInputComponent;
    @ViewChild('passwordConfirm',{static:false}) passwordConfirm: jqxPasswordInputComponent;
    @ViewChild('validatorReference',{static:false}) myValidator: jqxValidatorComponent;
    @ViewChild('gender',{static:false}) gender: jqxDropDownListComponent;
    @ViewChild('birthday',{static:false}) birthday: jqxDateTimeInputComponent;
    @ViewChild('buttonCreate',{static:false}) button: jqxButtonComponent ;
    @ViewChild('buttonLogin',{static:false}) buttonlgn: jqxButtonComponent ;
    
    
    
    //@ViewChild('button',{static:false}) button: jqxDateTimeInputComponent;
    
    
    constructor(private accountService: AccountService) { }
    public theme: string ="base";

    ngAfterViewInit(): void{
    //  this.myGrid.showloadelement();
    //  document.addEventListener('contextmenu', event => event.preventDefault());
      
    
      this.myValidator.createComponent(this.myValidator);
      this.firstName.createComponent(this.firstName);
      this.lastName.createComponent(this.lastName);
      this.userName.createComponent(this.userName);
      this.password.createComponent(this.password);
      this.passwordConfirm.createComponent(this.passwordConfirm);
      this.gender.createComponent(this.gender);
      this.birthday.createComponent(this.birthday);
      this.button.createComponent(this.button);
      this.buttonlgn.createComponent(this.buttonlgn);
    //  this.getData();
    }

    genders: string[] = ["male", "female"];
 
    rules: any[] = [
        {
            input: "#firstName", message: "First name is required!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
                return this.firstName.val() != "" && this.firstName.val() != "First";
            }
        },
        {
            input: "#lastName", message: "Last name is required!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
                return this.lastName.val() != "" && this.lastName.val() != "Last";
            }
        },
        { input: "#userName", message: "Username is required!", action: 'keyup, blur', rule: 'required' },
        { input: "#password", message: "Password is required!", action: 'keyup, blur', rule: 'required' },
        { input: "#passwordConfirm", message: "Password is required!", action: 'keyup, blur', rule: 'required' },
        {
            input: "#passwordConfirm", message: "Passwords should match!", action: 'keyup, blur', rule: (input: any, commit: any): boolean => {
                let firstPassword = this.password.val();
                let secondPassword = this.passwordConfirm.val();
                return firstPassword == secondPassword;
            }
        },
        {
            input: "#gender", message: "Gender is required!", action: 'blur', rule: (input: any, commit: any): boolean => {
                let index = this.gender.getSelectedIndex();
                return index != -1;
            }
        }
    ];


    buttonClicked(): void {


     //   this.myValidator.validate(document.getElementById('form'));
        const row = {
            firstName: this.firstName.val(),
            lastName: this.lastName.val(),
            userName: this.userName.val(),
            password: this.password.val(),
            gender: (this.gender.val() == 'female') ? 'f' : 'm' ,
            birthday: this.birthday.val()
          };

     
      this.putDataAccount( row );
     
    //  this.resetFofmFealds();
    //  this.myWindow.hide();


    };
    

    @Input() public isLogin = false  ;
    @Output() public isLoginChange = new EventEmitter();

    btnLoginClicked(){
        this.isLoginChange.emit(true);
    }

    validationSuccess(event: any): void {
        this.createAccount.setContent('<span style="margin: 10px;">Account created.</span>');
    };


    putDataAccount(row) {

       
     // console.log(['account putDataAccount', row ]);

         this.accountService.createAccount( row )
              .subscribe((data) => {
                //console.log(['account subscribe((data', data ]);
                if( data.mess ) {

                  this.createAccount.setContent('<span style="margin:20px;color:green;font-weight:bold;">New account has been created.<br>'+data.mess+'</span>');  
                    
               // console.log(['account after this.createAccount.setContent', data.mess ]);
                  this.btnLoginClicked()
                }
        });
    }

}