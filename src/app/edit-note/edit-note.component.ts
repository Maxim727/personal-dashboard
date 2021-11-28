import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  //@ts-ignore
  note: Note;

  constructor(private route: ActivatedRoute,
              private noteService: NoteService,
              private router: Router) { }

  onFormSubmit(form: NgForm){
     console.log(form.value)
     this.noteService.updateNote(this.note?.id, form.value)
     this.router.navigateByUrl('/notes')

   }
   
   deleteNote(){
    this.noteService.deleteNode(this.note.id)
    this.router.navigateByUrl('/notes')
   }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')
      console.log(idParam)
      //@ts-ignore
      this.note = this.noteService.getNote(idParam)
      //console.log(note)
    })
  }

}
