import { Component, ViewEncapsulation , OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { GridService } from '../services/grid.service';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

import { jqxCheckBoxComponent } from 'jqwidgets-ng/jqxcheckbox';  
import { jqxMenuComponent } from 'jqwidgets-ng/jqxmenu';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
//import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxMaskedInputComponent } from 'jqwidgets-ng/jqxmaskedinput';

import { AppComponent } from '../app.component';


@Component({
  selector: 'app-grid',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class VisitorsComponent implements AfterViewInit {
 
  @ViewChild('myGrid', {static: false}) myGrid: jqxGridComponent;
  @ViewChild('myactive', { static: false }) myactive: jqxCheckBoxComponent;
  
  @ViewChild('myWindow', { static: false }) myWindow: jqxWindowComponent;
  @ViewChild('mylogin', { static: false }) mylogin: jqxInputComponent ;
  @ViewChild('myfname', { static: false }) myfname: jqxInputComponent  ;
  @ViewChild('mylname', { static: false }) mylname: jqxInputComponent  ;
  @ViewChild('myemail', { static: false }) myemail: jqxInputComponent ;
  @ViewChild('myphone', { static: false }) myphone: jqxMaskedInputComponent ;
  @ViewChild('myMenu', { static: false }) myMenu: jqxMenuComponent;

  constructor(private gridService: GridService , private router : Router , private aComponent: AppComponent ) { }

  public theme = 'base';
  public sorttogglestates: any = 2;
  public isAdmin: any = 0;
  public myId = 0;
  public myToken: string = "";

  ngAfterViewInit(): void{
    this.myToken = this.aComponent.token ;
    const splitedToken  = this.myToken.split(';');
    this.isAdmin = Number(splitedToken[2]);

    if(this.isAdmin){

      this.myGrid.showloadelement();
      document.addEventListener('contextmenu', event => event.preventDefault());
      this.mylogin.createComponent(this.mylogin);
      this.myfname.createComponent(this.myfname);
      this.mylname.createComponent(this.mylname);
      this.myemail.createComponent(this.myemail);
      this.myphone.createComponent(this.myphone);
      this.myactive.createComponent(this.myactive);
      this.myGrid.sortby('id', 'asc');
      this.getData();
    }
  }


  getWidth(): any {
      if (document.body.offsetWidth < 850) {
        return '90%';
      }

      return 850;
  }

  editrow: number = -1;



  source: any = {
    localdata: null,
    datafields: [
      { name: 'id', type: 'int' },
        { name: 'login', type: 'string' },
        { name: 'fname', type: 'string' },
        { name: 'lname', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        { name: 'active', type: 'bool' }
    ],
    datatype: 'json',

};

dataAdapter: any = new jqx.dataAdapter(this.source);

columns: any[] = [
  { text: 'ID', datafield: 'id', width: 50 },
  { text: 'Login', datafield: 'login', width: 100 },
  { text: 'Fname', datafield: 'fname', width: 120 },
  { text: 'Lname', datafield: 'lname', width: 120 },
  { text: 'Active', columntype: 'checkbox', datafield: 'active', align: 'center',width: 70},
  { text: 'Email', datafield: 'email', minwidth:180 },
  { text: 'Phone', datafield: 'phone', minwidth: 190 }

 
];



myGridOnContextMenu(): boolean {
  return false;
}
myGridOnRowClick(event: any): void | boolean {

  //if (event.args.rightclick ) {
      this.myGrid.selectrow(event.args.rowindex);
      let scrollTop = window.scrollY;
      let scrollLeft = window.scrollX;
      this.myMenu.open(parseInt(event.args.originalEvent.clientX) + 5 + scrollLeft, parseInt(event.args.originalEvent.clientY) + 5 + scrollTop);
      return false;
  //}
}

myMenuOnItemClick(event: any): void {
  let args = event.args;
  let rowindex = this.myGrid.getselectedrowindex();
  let scrX = Number(event.pageX) - Number(event.offsetX) ;
  let scrY = Number(event.pageY) - Number(event.offsetY)  ;
 

  if (args.innerHTML == 'Edit Selected Row') {
      this.editrow = rowindex;
      //this.myWindow.position({ x: 60, y: 60 });

      this.myWindow.position({ x: scrX, y: scrY - 20 });
      // get the clicked row's data and initialize the input fields.
      let dataRecord = this.myGrid.getrowdata(this.editrow);
      this.mylogin.val(dataRecord.login);
      this.myfname.val(dataRecord.fname);
      this.mylname.val(dataRecord.lname);
      this.myemail.val(dataRecord.email);
      this.myphone.val(dataRecord.phone);
      this.myactive.val(dataRecord.active);
      // show the popup window.
      this.myWindow.open();
  } 
  else if(args.innerHTML == 'Add New Row'){
      this.editrow = 0;
      this.myWindow.position({ x: scrX, y: Number(scrY) + 5  });
    // get the clicked row's data and initialize the input fields.
      this.myWindow.open();
  }
  else {
      let rowDataRecord = this.myGrid.getrowdata(rowindex);

      this.delRow( rowDataRecord.id);
  }
}


SaveBtnOnClick(): void {
  
  let rowid = this.myGrid.getrowid(this.editrow);
  let rowDataRecord = this.myGrid.getrowdata(this.editrow);
  const row = {
        login: this.mylogin.val(),
        fname: this.myfname.val(),
        lname: this.mylname.val(),
        email: this.myemail.val(),
        phone: this.myphone.val(),
        active: this.myactive.val()
      };

  if ( rowid < '1' ) {
      rowDataRecord.id = 0 ;
  }

  this.myGrid.updaterow(rowid, row);
 
  this.updRow( rowDataRecord.id, row );
 
  this.resetFofmFealds();
  this.myWindow.hide();

}

CancelBtnOnClick(): void {
  this.resetFofmFealds();
  this.myWindow.hide();
}

resetFofmFealds(){
  this.mylogin.val('');
  this.myfname.val('');
  this.mylname.val('');
  this.myemail.val('');
  this.myactive.val(false);
  this.myphone.val('(000)000-0000');
}


getData() {
  let clsList ;

  this.gridService.getData()
    .subscribe((data) => {
      clsList = data.data.data;
      this.source.localdata = clsList;
      this.myGrid.updatebounddata()  ;
    });
};



delRow(rowId) {

  this.gridService.delRow(rowId)
        .subscribe((data) => {
            this.getData();
  });

};

 

updRow(recid,row) {


  recid = (recid === 0) ? null : recid ;

  this.gridService.updRow( recid, row )
        .subscribe((data) => {
          this.getData();
      });


}; 



  updatefilterconditions = (type: string, defaultconditions: any): string[] => {
    let stringcomparisonoperators = ['CONTAINS', 'DOES_NOT_CONTAIN'];
    let numericcomparisonoperators = ['LESS_THAN', 'GREATER_THAN'];
    let datecomparisonoperators = ['LESS_THAN', 'GREATER_THAN'];
    let booleancomparisonoperators = ['EQUAL', 'NOT_EQUAL'];
    switch (type) {
        case 'stringfilter':
            return stringcomparisonoperators;
        case 'numericfilter':
            return numericcomparisonoperators;
        case 'datefilter':
            return datecomparisonoperators;
        case 'booleanfilter':
            return booleancomparisonoperators;
    }
  };


  ready = (): void => {
      let localizationObject = {
          filterstringcomparisonoperators: ['contains', 'does not contain'],
          // filter numeric comparison operators.
          filternumericcomparisonoperators: ['less than', 'greater than'],
          // filter date comparison operators.
          filterdatecomparisonoperators: ['less than', 'greater than'],
          // filter bool comparison operators.
          filterbooleancomparisonoperators: ['equal', 'not equal']
      }

      this.myGrid.localizestrings(localizationObject);
  }

  onSelect(visitor){
    this.router.navigate(['/visitor']);
  }

}
