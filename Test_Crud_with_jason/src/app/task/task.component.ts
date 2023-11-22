import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskModel } from './task.model';
import { TaskApiService } from '../services/task-api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  taskModel: TaskModel = new TaskModel();

  formValue !: FormGroup;

  taskData: any;


  constructor(private api: TaskApiService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({

      title: [''],
      done: [''],

    });
    this.getAllTask();

  }


  addTask() {

    this.taskModel.title = this.formValue.value.title;
    this.taskModel.done = this.formValue.value.done;

    this.api.saveTask(this.taskModel)
      .subscribe(res => {
        console.log(res);
        alert("Task Saved");
      },
        error => {
          alert("Task Not save");
        }
      )
  }

  getAllTask() {
    this.api.getAllTask()
      .subscribe(res => {
        this.taskData = res

      });

  }

  deleteTask(row:any){
    this.api.deleteTask(row)
      .subscribe(res => {
        console.log(res);
        alert("Task Deleted");
      },
        error => {
          alert("Task Not Delete");
        }
      )

  }

  onEdite(row: any) {

    this.taskModel.id=row.id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['done'].setValue(row.done);


  }


  updateTask(){

    this.taskModel.title = this.formValue.value.title;
    this.taskModel.done = this.formValue.value.done;

    this.api.editTask(this.taskModel.id, this.taskModel)
      .subscribe(res => {
        console.log(res);
        alert("Task Updated");
      },
        error => {
          alert("Task Not Update");
        }
      )
  }



}
