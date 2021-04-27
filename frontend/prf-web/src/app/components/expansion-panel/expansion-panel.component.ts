import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @ViewChild('container') container: any;
  open: boolean = false;
  height: number | any = 0;
  visibility: string = 'hidden';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.height = this.container.nativeElement.clientHeight;
    setTimeout(() => {
      this.visibility = 'visible';
    }, 0);
    this.cdr.detectChanges();
  }

  toggle() {
    this.open = !this.open;
  }

  getHeight() {
    return -this.height + 'px';
  }

}
