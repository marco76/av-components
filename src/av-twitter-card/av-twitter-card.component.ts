import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {TwitterService} from './TwitterService';
import {HttpClient} from '@angular/common/http';

@Component({
  selector:'av-twitter-card',
  templateUrl: './av-twitter-card.html',
  styleUrls: ['./av-twitter-card.css'],
  providers: [TwitterService]
})
export class AvTwitterCard implements OnInit, AfterViewInit {

  @Input() twitterStoryURL: string;

  constructor(private elementRef: ElementRef, private twitterService: TwitterService) {
  }

  ngOnInit() {
    console.log('url', this.twitterStoryURL);

    this.twitterService.getTwitterData('http://localhost:8080/rest/twitter');
  }

  ngAfterViewInit() {
    // DOM manipulation should be exceptional
    // but we avoid to have this script in every component
    /*let scriptElement: HTMLScriptElement;
    scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = "http://platform.twitter.com/widgets.js";
    this.elementRef.nativeElement.appendChild(scriptElement);*/
  }
}
