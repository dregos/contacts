import { Component, OnInit, Input, EventEmitter, Output, SimpleChange } from '@angular/core';
import { Contact } from '../../../shared/models/contact.model';

@Component({
  selector: '[contactRow]',
  templateUrl: './contact-row.component.html',
})

export class ContactRowComponent implements OnInit {

  @Input() 
  set contactRow(contact: Contact){
    this.contact = contact;
  }
  @Input() index: number;
  @Output() onEdit = new EventEmitter<Contact>();
  @Output() onRemove = new EventEmitter<Contact>();

  private contact: Contact;
  private oldIndex:number;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[index:string]: SimpleChange}){
    // console.log(changes);
    if(changes.index.previousValue){
      this.oldIndex = changes.index.previousValue;
    }
  }

  edit(contact: Contact){
    this.onEdit.emit(contact);
  }

  remove(contact: Contact){
    this.onRemove.emit(contact);
  }

}
