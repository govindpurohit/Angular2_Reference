import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { DownloadService } from '../services/download/download.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : any = {};
  constructor(public localStorageService : LocalStorageService, public downloadService : DownloadService, public route : Router) { }

  ngOnInit() {
    this.user = this.localStorageService.getLoginInfo();
  }

   public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  logout(){
    this.localStorageService.clear();
    this.route.navigate(['/login']);
  }

  startDownload(){
    this.downloadService.downloadFile().subscribe(data => this.downloadFile(data),
                  error => console.log("Error downloading the file."),
                  () => console.log('Completed file download.'))
  }

  downloadFile(data: Response){
    var blob = new Blob([data], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
