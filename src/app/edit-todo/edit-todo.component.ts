import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  showValidationErrors!: boolean;
  todo!: Todo;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoservice: TodoService,
              private notificaitonService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id')
      //@ts-ignore
      this.todo = this.todoservice.getTodo(todoId)
    } )
  }

  //@ts-ignore
  onFormSubmit(form: NgForm){

    if(form.invalid) return this.showValidationErrors = true;

    const todo = new Todo(form.value.text)
    this.todoservice.updateTodo(this.todo.id, form.value)

    this.router.navigateByUrl('/todos')
    this.notificaitonService.show("Todo edited ✏️")
  }
  
}
