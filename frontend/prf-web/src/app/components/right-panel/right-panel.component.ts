import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close(event: MouseEvent) {
    if (event.clientX > window.innerWidth - 400 - 32) return;

    let rightPanel = document.getElementsByTagName('app-right-panel')[0];
    let panel = document.getElementsByClassName('panel')[0];
    panel.className = 'panel close';

    setTimeout(() => {
      document.body.removeChild(rightPanel);
    }, 200);
  }

}
