import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  baseUrl: string = "http://localhost:8082/";

  constructor(private http: HttpClient) { }

  saveTask(data: any) {

    return this.http.post<any>(this.baseUrl + "addtask", data)
      .pipe(map(res => {
        return res;
      }
      ));

  }

  getAllTask(){

    return this.http.get<any>(this.baseUrl + "alltask")
      .pipe(map(res => {
        return res;
      }
      ));
  }

  deleteTask(id:number){
    return this.http.delete<any>(this.baseUrl +"/delete/"+id)
    .pipe(map(res => {
      return res;
    }
    ));

  }

  editTask(id:number, row:any){
    return this.http.put<any>(this.baseUrl +"/update/"+id, row)
    .pipe(map(res => {
      return res;
    }
    ));

  }


}
