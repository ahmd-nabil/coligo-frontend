import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit{
  announcements : any[] = []
  constructor(private announcementService: AnnouncementService) {}
  
  ngOnInit(): void {
    this.announcementService.getAllAnnouncements().subscribe(resultPage => {
      this.announcements = resultPage.content;
    });
  }

    
}
