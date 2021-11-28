import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [
    new Note('test title', 'test content'),
    new Note('test1 title', 'test1 content')
  ]

  constructor() { }

  getNotes(){
    return this.notes;
  }

  getNote(id: any){
    return this.notes.find(n =>  n.id === id)
  }

  addNote(note: Note){
    // adds to the beginning of arrat
    this.notes.unshift(note)
  }

  updateNote(id: string, updatedField: Partial<Note>){
    const note = this.getNote(id)
    Object.assign(note, updatedField)
  }

  deleteNode(id: string){
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if(noteIndex == -1) return
    this.notes.splice(noteIndex, 1)
  }
}
