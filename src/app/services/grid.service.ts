import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { Observable  } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GridService {

private baseUrl: string = 'http://www.qrz.co.il/studio/vgromyko.info/projects/api/index.php?key=backgroundFFFFFF';

constructor(private httpClient: HttpClient) { }


  getData(): Observable<any> {
      return this.httpClient.get( this.baseUrl + '&getData=1&userList=1&c=all');
  };

  delRow(rowId): Observable<any> {
      return this.httpClient.get( this.baseUrl + '&delData=1&userId='+rowId+',' );
  };

  updRow(rowid, row): Observable<any> {
    console.log(['service updRow', rowid, row ]);
    const body = {
      id : (rowid == null) ? null : rowid.toString() ,
      fname : row.fname,
      lname : row.lname,
      login : row.login,
  //    passw : row.passw,
  //    passw : row.passw="119111",
      phone : row.phone,
      email : row.email,
      data :  row.data = null
    };

    const  posHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };


    var url =this.baseUrl + '&putData=1&userId=' + rowid;
        url += '&fname='+row.fname;
        url += '&lname='+row.lname;
        url += '&login='+row.login;
      //  url += '&passw='+row.passw;
        url += '&phone='+row.phone;
        url += '&email='+row.email;    
      //  url += '&data='+data.data;    
    console.log(url);

     return this.httpClient.post( 
       this.baseUrl + '&putData=1&userId='+rowid, 
        body ,
        posHttpOptions)
          .pipe(map(data => data));
}



  sortData(sortOptions): Observable<any> {
    //      return this.httpClient.post(`${this.baseUrl}+'&getData=1&userList=1'`, sortOptions);
    return null;
  };

}

