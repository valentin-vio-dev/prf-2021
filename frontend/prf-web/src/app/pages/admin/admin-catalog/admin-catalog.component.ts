import { Component, OnInit } from '@angular/core';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { TopNavComponent } from 'src/app/components/top-nav/top-nav.component';
import { ModalService } from 'src/app/services/modal/modal.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-admin-catalog',
  templateUrl: './admin-catalog.component.html',
  styleUrls: ['./admin-catalog.component.scss']
})
export class AdminCatalogComponent implements OnInit {

  constructor(private panelService: PanelService) { }

  ngOnInit(): void {
  }

  addCatalogItem() {
    this.panelService.create(AddItemComponent);
  }

}
