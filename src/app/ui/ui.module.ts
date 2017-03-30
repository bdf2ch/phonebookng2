import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent, ModalContentComponent } from './modal/modal.component';
import { ModalService } from "./modal/modal.service";
import { TreeComponent } from './tree/tree.component';
import { TreeItemComponent } from './tree/tree-item.component';
import { TreeService } from "./tree/tree.service";
import { TabsComponent } from './tabs/tabs.component';
import { ScrollbarDirective } from './scrollbar/scrollbar.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    ModalContentComponent,
    TreeComponent,
    TreeItemComponent,
    TabsComponent,
    ScrollbarDirective
  ],
  exports: [
    ModalComponent,
    ModalContentComponent,
    TreeComponent,
    TreeItemComponent,
    ScrollbarDirective
  ],
  providers: [
    ModalService,
    TreeService
  ]
})
export class UiModule {};
