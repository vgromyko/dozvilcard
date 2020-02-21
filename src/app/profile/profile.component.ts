import { Component, OnInit , ViewChild , AfterViewInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {  

  constructor( private router : Router , private aComponent: AppComponent)  { }

  public theme: string = "base";

  public myId = 0;
  public myToken: string = "";
  public myfName: string = "";
  public mylName: string = "";
  public mylogin: string = "";
  public mybirthday: string = "";
  public mygender: string = "";
  public myPhotoUrl: string = "";
  public myemail: string = "";
  public myphone: string = "";
  public cardLoginData: any ;

  ngOnInit(): void {
    this.cardLoginData = this.aComponent.loginData[0] ;
    this.setAccountFields();
  }

  ngAfterViewInit(): void {}


  
  setAccountFields(){
    this.myId = Number(this.cardLoginData.id) ;
    this.myfName = this.cardLoginData.fname ;
    this.mylName = this.cardLoginData.lname ;
    this.mylogin = this.cardLoginData.login ;
    this.mybirthday = this.cardLoginData.dob ;
    this.mygender = ( this.cardLoginData.gender=="f" ) ? "Female" :"Male" ;
    this.myemail = this.cardLoginData.email ;
    this.myphone = this.cardLoginData.phone ;
    this.myPhotoUrl = this.aComponent.baseImageUrl + this.myId +".jpg" ;
    
  }



  onSelect(profile){
    this.router.navigate(['/profile']);
  }

}
