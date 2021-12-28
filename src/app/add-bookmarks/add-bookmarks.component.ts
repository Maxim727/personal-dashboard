import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmarks',
  templateUrl: './add-bookmarks.component.html',
  styleUrls: ['./add-bookmarks.component.scss']
})
export class AddBookmarksComponent implements OnInit {
  showValidationErrors!: boolean;

  constructor(private router: Router, private bookmarkService: BookmarkService, 
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  //@ts-ignore
  onFormSubmit(form: NgForm){
    
    console.log(form.invalid)

    if(form.invalid) return this.showValidationErrors = true;

    const bookmark = new Bookmark(form.value.name, form.value.url)
    this.bookmarkService.addBookmark(bookmark)

    this.router.navigateByUrl('/bookmarks')
    this.notificationService.show('Bookmark created ✅')
  }
  
}

