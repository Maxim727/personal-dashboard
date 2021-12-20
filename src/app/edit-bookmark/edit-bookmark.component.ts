import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark!: Bookmark; 

  constructor(private bookmarkService: BookmarkService,
              private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      const bookmarkId: any = paramMap.get('id')
      console.log(bookmarkId)

      //@ts-ignore
      this.bookmark = this.bookmarkService.getBookmark(bookmarkId)
      console.log(this.bookmark)
    })
  }

  onFormSubmit(form: Form){
    console.log(form)
  }
}
