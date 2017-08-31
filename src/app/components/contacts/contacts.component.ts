import { Component } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../../shared/models/contact.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html'
})

export class ContactsComponent {

	private contacts: any[] = [];
	private filter: string = '';

  private people: Observable<any>;


	constructor (private contactService: ContactsService){
		contactService.getContacts().subscribe(data => {
			this.contacts = data;
		}, (err: HttpErrorResponse) => {
			alert(`Bakend returned code ${err.status} with message ${err.error}`);
		}); 

    this.people = Observable.of([
      {name:'Joey'},
      {name:'Bob'},
      {name:'Susy'},
    ]);
	}

	remove(contact){

    this.contactService.removeContact(contact)
    .subscribe((contact: Contact)=>{
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index,1);
    });

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