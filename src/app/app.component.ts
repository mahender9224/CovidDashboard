import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit  {
  title = 'covid19';
  data:any;
   data1:any;
  total: any;
  state: any;
    constructor(private httpClient: HttpClient){
      
       this.dataSource = new MatTableDataSource();
       this.dataSource1 = new MatTableDataSource();
    }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource1: MatTableDataSource<any>;
  @ViewChild('p1') paginator1: MatPaginator;
  @ViewChild('m1') sort1: MatSort;

     displayedColumns: string[] = ['state','confirmed', 'deaths', 'recovered'];
     

     displayedColumns1: string[] = ['district','confirmed', 'deceased', 'recovered'];
  ngOnInit(){
    this.httpClient.get("https://data.covid19india.org/data.json").subscribe((data:any) =>{
      console.log(data);
      this.data = data.statewise;
       this.dataSource = new MatTableDataSource(data.statewise);
       
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
       this.total=data.statewise[0];
    });
  }

  getdata(state){
    this.state=state;
        this.httpClient.get("https://data.covid19india.org/state_district_wise.json").subscribe((data:any) =>{
      console.log(data);
      const resultArray = Object.keys(data).map(index => {
    let d = data[index];
    return d;
});
      this.data1 = resultArray.filter(a=> a.statecode==state)[0];
           const result = Object.keys(this.data1?.districtData).map(index => {
    let d = this.data1?.districtData[index];
    d['district']=index;
    return d;
});
       this.dataSource1 = new MatTableDataSource(result);
       
      console.log(result,resultArray,this.data1?.districtData);
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;
    });

  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
}
