import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = 'http://www.qrz.co.il/studio/vgromyko.info/projects/api/index.php?key=backgroundFFFFFF';
  public baseImageUrl: string = 'http://www.qrz.co.il/images/app/'; 
  constructor(private httpClient: HttpClient) { }

  checkLogin(login,password): Observable<any> {
  //  console.log(' checkLogin:'+login+','+password); 
    return this.httpClient.get( this.baseUrl + '&checkLogin=1&login='+login+'&password='+password);
  };

  getAccount(userId): Observable<any> {
    //  console.log(' checkLogin:'+login+','+password); 
      return this.httpClient.get( this.baseUrl + '&getData=1&userId='+userId );
    };

  createAccount(row): Observable<any> {
    console.log(['service createAccount', row ]);
    const body = {
      id : null  ,
      fname : row.firstName,
      lname : row.lastName,
      login : row.userName,
      passw : row.password,
      gender : row.gender,
      birthday : row.birthday,
      active : '0',
      phone : null,
      email : null,
      data :  null
    };

    const  posHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };


    var url =this.baseUrl + '&putData=1&userId=0';
        url += '&fname='+row.fname;
        url += '&lname='+row.lname;
        url += '&login='+row.login;
        url += '&passw='+row.passw;
        url += '&gender='+row.gender;
        url += '&birthday='+row.birthday;
        url += '&active='+row.active;
        url += '&phone='+row.phone;
        url += '&email='+row.email;
        
        
      //  url += '&data='+data.data;    
    console.log(url);

     return this.httpClient.post( 
       this.baseUrl + '&putData=1&userId=', 
        body ,
        posHttpOptions)
          .pipe(map(data => data));
      }


}