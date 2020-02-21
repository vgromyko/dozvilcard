import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {

  constructor() { }

  title  = '';
  token  = '';
  isGrid = false;
  lginlgout ='';
  loginData: any ;
  baseImageUrl: string = 'http://www.qrz.co.il/images/app/'; 
  


  @Input() public isLogin = true ;
  @Output() public isLoginGhange = new EventEmitter();
  @Input() public isCreate = false ;
  @Output() public isCreateGhange = new EventEmitter();
 

  ngOnInit() {
  

  }

  logout(){
   // console.log(this.loginData);

    this.loginData = null;
   
    this.isLogin = true;
    this.isGrid = false;
    this.isCreate = false;
    this.token  = '';
    this.lginlgout = '';
  }

}
