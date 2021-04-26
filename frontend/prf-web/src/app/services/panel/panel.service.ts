import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  create(component: any) {
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    
    const panelRef = this.componentFactoryResolver.resolveComponentFactory(RightPanelComponent).create(this.injector);
    this.appRef.attachView(panelRef.hostView);
    const panelElem = (panelRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    
    let panelContainer = panelElem.getElementsByClassName('panel')[0];
    panelContainer.appendChild(domElem);
    panelContainer.className = 'panel open';
    document.body.appendChild(panelElem);

    setTimeout(() => {
      panelContainer.className = 'panel';
    }, 250)

    
    // 5. Wait some time and remove it from the component tree and from the DOM
    /*setTimeout(() => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }, 3000);*/
  }
}
