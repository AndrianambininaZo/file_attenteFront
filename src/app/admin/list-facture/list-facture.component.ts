import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.scss']
})
export class ListFactureComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef | undefined;


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    const scrollContainer = this.scrollContainer?.nativeElement;
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }

}
