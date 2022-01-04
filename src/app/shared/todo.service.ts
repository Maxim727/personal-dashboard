import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = [];
  storageListenSub: Subscription;
  constructor() {
    this.loadState()

    //@ts-ignore
    this.storageListenSub = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
      console.log('storage event fired ')
      console.log(event)
      if(event.key === 'todos'){
        this.loadState()
      }
    })
  }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    this.saveState()
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    Object.assign(todo, updatedTodoFields)
    this.saveState()
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return

    this.todos.splice(index, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      //@ts-ignore
      const todoInStorage = JSON.parse(localStorage.getItem('todos'))

      if(!todoInStorage) return
      this.todos.length = 0;
      // clear the note array (while keeping the reference)

      this.todos.push(...todoInStorage)

      //this.todos = todosInStorage; 
    }
    catch (e) {
      console.warn('There was an error retrieving todos from localstorage')
      console.warn(e)
    }
  }

  ngOnDestroy(): void {
    if(this.storageListenSub) this.storageListenSub.unsubscribe() 

  }
}
