import { TaskModel } from './../models/taskModel';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getAll():Observable<TaskModel[]>{
    return this._httpClient.get<TaskModel[]>(`${this.route}/task-list`);
  }

  getById(id:number):Observable<TaskModel>{
    return this._httpClient.get<TaskModel>(`${this.route}/task-list/${id}`)
  }

  add():Observable<TaskModel>{
    let newValue:TaskModel= {id:0,name:"Nueva tarea", completed:false};
    return this._httpClient.post<TaskModel>(`${this.route}/task-list`,newValue);
  }

  update(id:number, body?:TaskModel):Observable<TaskModel>{
    return this._httpClient.put<TaskModel>(`${this.route}/task-list/${id}`,body);
  }

  delete(id:number):Observable<TaskModel>{
    return this._httpClient.delete<TaskModel>(`${this.route}/task-list/${id}`);
  }
}
