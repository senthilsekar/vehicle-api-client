import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  
  vehicleObj ={
    "id": null,
    "year": null,
    "make": "",
    "model": ""
} ;
  
   responseObj : string = null;
   respError: string = null;
  constructor(private httpClient: HttpClient){

  }
  clearFields(){
    this.vehicleObj.id=null;
    this.vehicleObj.year=null;
    this.vehicleObj.make="";
    this.vehicleObj.model="";
  }
  save(){
    if(this.vehicleObj.id!=null && this.vehicleObj.year!=null && this.vehicleObj.model!=null && this.vehicleObj.make!=null ){
        this.httpClient.post("http://localhost:8081/vehicles", JSON.stringify(this.vehicleObj), {headers: new HttpHeaders({'Content-Type':'application/json','Accept':'text/plain'})})
        .subscribe(respdata  => console.log(respdata), (errordata)=>{console.log(errordata); this.respError=errordata.error});
    
        this.clearFields();
    }
    
  }

  update(){
    if(this.vehicleObj.id!=null && this.vehicleObj.year!=null && this.vehicleObj.model!=null && this.vehicleObj.make!=null ){
      this.httpClient.put("http://localhost:8081/vehicles", JSON.stringify(this.vehicleObj), {headers: new HttpHeaders({'Content-Type':'application/json','Accept':'text/plain'})})
      .subscribe(respdata  => console.log(respdata), (errordata)=>{console.log(errordata); this.respError=errordata.error});
  
      this.clearFields();
  }
  }

  getAll(){
      this.httpClient.get("http://localhost:8081/vehicles")
      .subscribe(responsedata => this.responseObj = JSON.stringify(responsedata), (errordata)=>{console.log(errordata); this.respError=errordata.error});
  }

  delete(){
    if(this.vehicleObj.id!=null){
         this.httpClient.delete("http://localhost:8081/vehicles/"+this.vehicleObj.id)
        .subscribe(responsedata => console.log(responsedata), (errordata)=>{console.log(errordata); this.respError=errordata.error});
        this.clearFields();
    }
  }


}
