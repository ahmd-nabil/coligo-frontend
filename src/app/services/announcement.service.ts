import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  
  /** would be better to create announcementSubject and fetch all announcements to it then use it accross different components */
  getAllAnnouncements(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/announcements');
  }
}
