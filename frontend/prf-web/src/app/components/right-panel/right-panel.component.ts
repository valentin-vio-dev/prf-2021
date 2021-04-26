import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel/panel.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  constructor(private panelService: PanelService) { }

  ngOnInit(): void {
  }

  close(event: MouseEvent) {
    if (event.clientX > window.innerWidth - 400 - 32 || event.detail == 0) return;

    this.panelService.closeCurrentPanel();
  }

}
