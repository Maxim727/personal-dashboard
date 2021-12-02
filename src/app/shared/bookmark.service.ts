import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Bookmark[] = [
    new Bookmark('Wikipedia', 'http://wikipedia.org'),
    new Bookmark('Google', 'http://google.com'),
    new Bookmark('Youtube', 'http://youtube.com'),
    new Bookmark('Facebook', 'http://facebook.com'),
    new Bookmark('Twitter', 'http://twitter.com'),
  ];

  constructor() { }

  getBookmarks(){
    return this.bookmarks
  }

  getBookmark(id: string){
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark){
    this.bookmarks.push(bookmark)
  }

  updateBookmark(id: string, updateFields: Partial<Bookmark>){
    const bookmark = this.getBookmark(id)
    Object.assign(bookmark, updateFields)
  }

  deleteBookmark(id: string){
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
    // -1 will be returned if such bookmark was not found
    if(bookmarkIndex == -1) return

    this.bookmarks.splice(bookmarkIndex, 1)
  }
}
