import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  
  //@ts-ignore
  showValidationErrors: boolean

  constructor(private noteService: NoteService,
              private router: Router,
              private notifcationService: NotificationService) { }

  ngOnInit(): void {
  }

  //@ts-ignore
  onFormSubmit(form: NgForm){

    if(form.invalid) {
      return this.showValidationErrors = true 
    }
    
    const note = new Note(form.value.title, form.value.content)
    this.notifcationService.show("Note created ✅")


    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
  }
}
