import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { environment } from '../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  uid: string = "";
  cid: string = "";
  url: string = "";

  ngOnInit() {
    //获取页面参数
    this.route.queryParams.subscribe(params=> {
      this.uid   = params['uid'];
      this.cid = params['cid'];
    });

    this.url = `${environment.display_url}`+'/embed.html?uid='+this.uid+'&cid='+this.cid+'&auto-start=false&light-content=false&w=480&h=360';
  }

  safeurl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}
