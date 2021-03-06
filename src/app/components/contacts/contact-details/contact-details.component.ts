import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactsService } from '../../../shared/services/contacts.service';
import { PageTitleService } from './../../../shared/services/page-title.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent implements OnInit {

	private contact: any = {};
  
  constructor(private route: ActivatedRoute, 
              private contactService: ContactsService,
              private pageTitleService: PageTitleService) { }

  ngOnInit() {
  	this.route.params.subscribe(()=>{
  		let id = parseInt(this.route.snapshot.paramMap.get('id'));
    		this.contactService.getContacts().subscribe((data:any[]) => {
          this.contact = data.find(contact => contact['id'] == id);
          this.pageTitleService.setTitle('Contact details - ' + this.contact.firstName);
        });
  	});
  }

}
