import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: Bookmark[] = [];
  storageListenSub: Subscription

  constructor() { 
    this.loadState()

    //@ts-ignore
    this.storageListenSub = fromEvent(window, 'storage').subscribe((event: StorageEvent) => {
      console.log('storage event fired ')
      console.log(event)
      if(event.key === 'bookmarks'){
        this.loadState()
      }
    })
  }

  getBookmarks(){
    return this.bookmarks
  }

  getBookmark(id: string){
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: Bookmark){
    this.bookmarks.push(bookmark)
    this.saveState()

  }

  updateBookmark(id: string, updateFields: Partial<Bookmark>){
    const bookmark = this.getBookmark(id)
    Object.assign(bookmark, updateFields)
    this.saveState()
  }

  deleteBookmark(id: string){
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
    // -1 will be returned if such bookmark was not found
    if(bookmarkIndex == -1) return

    this.bookmarks.splice(bookmarkIndex, 1)
  }


  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
  }

  loadState() {
    try {
      //@ts-ignore
      const todoInStorage = JSON.parse(localStorage.getItem('bookmarks'), (key, value) => {
        if(key === 'url') return new URL(value)
        return value
      })

      if(!todoInStorage) return
      this.bookmarks.length = 0;
      // clear the note array (while keeping the reference)

      this.bookmarks.push(...todoInStorage)

      //this.bookmarks = bookmarksInStorage; 
    }
    catch (e) {
      console.warn('There was an error retrieving bookmarks from localstorage')
      console.warn(e)
    }
  }

  ngOnDestroy(): void {
    if(this.storageListenSub) this.storageListenSub.unsubscribe() 

  }
}
