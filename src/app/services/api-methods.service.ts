import { TaskModel } from './../models/taskModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMethodsService {

  tasks:TaskModel[]=[];
  readonly route= environment.api_url;
  constructor(private _httpClient: HttpClient) { }

  getTasks(){
    return this.tasks;
  }
  getAll():any{
    this._httpClient.get<any>(`${this.route}/task-list`).subscribe((response)=>{
      if(!response.error){
        this.tasks=response;
        return response;
      }
      else
        throw new console.error();
         ; 
    })
  }

  getById(id:number){
    this._httpClient.get<TaskModel>(`${this.route}/task-list/${id}`).subscribe((response)=>{
      if(response)
          return response;
    })
  }

  add(){
    let newValue:TaskModel= {id:0,name:"Nueva tarea", completed:false};
    this._httpClient.post(`${this.route}/task-list`,newValue).subscribe((response)=>{
      console.log(response);

    });
  }

  update(id:number, model:TaskModel){
    this._httpClient.put(`${this.route}/${id}`,model);
  }

  delete(id:number){
    this._httpClient.delete(`${this.route}/task-list/${id}`);
  }
}
