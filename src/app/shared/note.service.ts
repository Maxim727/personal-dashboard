import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []
  storageListenSub: Subscription;

  constructor() {
    this.loadState()

    //@ts-ignore
    this.storageListenSub = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
      console.log('storage event fired ')
      console.log(event)
      if(event.key === 'notes'){
        this.loadState()
      }
    })
  }

  getNotes() { 
    return this.notes;
  }

  getNote(id: any) {
    return this.notes.find(n => n.id === id)
  }

  addNote(note: Note) {
    // adds to the beginning of arrat
    this.notes.unshift(note)

    this.saveState()
  }

  updateNote(id: string, updatedField: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updatedField)

    this.saveState()
  }
 
  deleteNode(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return
    this.notes.splice(noteIndex, 1)
    this.saveState()
  }

  // saving to the browser localstorage 
  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
      //@ts-ignore
      const notesInStorage = JSON.parse(localStorage.getItem('notes'))
      if (!notesInStorage) return
      this.notes.length = 0;
      // clear the note array (while keeping the reference)

      this.notes.push(...notesInStorage)

      //this.notes = notesInStorage; 
    } catch (e) {
      console.warn('There was an error retrieving notes from localstorage')
      console.warn(e)
    }

  }

  ngOnDestroy(): void {
     if(this.storageListenSub) this.storageListenSub.unsubscribe() 
  }
}
