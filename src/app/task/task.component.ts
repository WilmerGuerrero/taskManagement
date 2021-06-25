import { ApiMethodsService } from './../services/api-methods.service';
import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../models/taskModel';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: [
  ]
})
export class TaskComponent implements OnInit {

  tasks:TaskModel[]=[];
  constructor(private _httpService:ApiMethodsService) { 
  }
  
  ngOnInit(): void {
    setTimeout(()=>{},1000)
    this._httpService.getAll();
    this._httpService.getTasks();
    this.tasks=this._httpService.tasks;
    console.log(this.tasks)
  }

  getAll(){
    this.tasks=this._httpService.getAll()
  }

  getById(id:number){
    this._httpService.getById(id);
  }

  addTask(){
    this._httpService.add();
  }
  update(id:number,value:TaskModel){
    this._httpService.update(id,value);
    this.getAll();
  }

  onDelete(id:number){
    this._httpService.delete(id);
    this.getAll();
  }

}
