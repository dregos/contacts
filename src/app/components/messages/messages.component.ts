import { Component } from '@angular/core';
import { PageTitleService } from '../../shared/services/page-title.service';  

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {

  constructor(private pageTitleService: PageTitleService) {
    pageTitleService.setTitle('Your messages');

  }


}
