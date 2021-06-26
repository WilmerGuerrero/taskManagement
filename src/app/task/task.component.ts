import { ApiMethodsService } from './../services/api-methods.service';
import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../models/taskModel';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styles: [
  ]
})
export class TaskComponent implements OnInit {
  @Input() complete:boolean;
  tasks:TaskModel[]=[];
  constructor(private _httpService:ApiMethodsService) { 
  }
  
  ngOnInit(): void {
    this.getAll();
    this._httpService.getTasks();
    this.tasks=this._httpService.tasks;
 
  }

  getAll(){
    this._httpService.getAll().subscribe((response)=>{
      if(response){
        this.tasks=response;
        console.log(this.tasks)
      }
    },(error)=>{
      console.log(error)
    })
  }

  getById(id:number){
    this._httpService.getById(id).subscribe((response)=>{
      if(response)
          return response;
    });
  }

  addTask(){
    this._httpService.add().subscribe((response)=>{
      this.tasks.unshift(response);
    });
  }
  completeTask(id:number){
    this._httpService.update(id).subscribe(()=>{
      let item =this.tasks.find(x=>x.id==id).completed;
      if(item==true){
        this.tasks.find(x=>x.id==id).completed=false;
      }else{
        this.tasks.find(x=>x.id==id).completed=true;
      }
    });
  }

  deleteTask(id:number){
    this._httpService.delete(id).subscribe((response)=>{
      let newTaskList = this.tasks.filter(x=>x.id!==id);
      this.tasks=newTaskList;
    });;
  }

}
