import { Component } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../../shared/models/contact.model';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html'
})

export class ContactsComponent {

	private contacts: any[] = [];
	private filter: string = '';

	constructor (private contactService: ContactsService){
		contactService.getContacts().subscribe(data => {
			this.contacts = data;
		}, (err: HttpErrorResponse) => {
			alert(`Bakend returned code ${err.status} with message ${err.error}`);
		}); 
	}

	remove(contact){
		const index = this.contacts.indexOf(contact);
		this.contacts.splice(index,1);
	}

	submitContact(newContact){
    if(newContact.id){
      this.contactService.editContact(newContact)
        .subscribe((contact: Contact) => {
          let oldContact = this.contacts.filter(c => c.id == contact.id);
          if (oldContact.length){
            Object.assign(oldContact[0], contact);
          }
        });
    } else {
      this.contactService.addContact(newContact)
        .subscribe(contact =>{
          this.contacts.push(contact);
        });
    }
		
	}
	
}