import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { PhoneBookService } from "../phone-book.service";
import { DivisionsService } from "../divisions.service";
import { TreeService } from "../../ui/tree/tree.service";
import { TreeItem } from "../../ui/tree/tree-item";
import { Contact } from "../Contact.model";

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {
  divisionId: number = 0;
  loginPopupIsOpened: boolean = false;

  constructor(private $session: SessionService,
              private $divisions: DivisionsService,
              private $phonebook: PhoneBookService,
              private $trees: TreeService) {};


  /**
   * Инициализация компонента приложения
   */
  ngOnInit() {
    if (this.$divisions.getAll().length === 0)
      this.$divisions.fetchAll().subscribe(() => {
        this.populateDivisionsTree();
      });
  };


  openLoginPopup(): void {
    console.log('open login popup');
    this.loginPopupIsOpened = true;
  };


  /**
   * Заполняет дерево структурных подразделений
   */
  populateDivisionsTree() {
    let tree = this.$trees.getById('divisions');
    if (tree.totalItemsCount() === 0) {
      let length = this.$divisions.getAll().length;
      for (let i = 0; i < length; i++) {
        tree.addItem({
          key: this.$divisions.getAll()[i].id.toString(),
          parentKey: this.$divisions.getAll()[i].parentId.toString(),
          title: this.$divisions.getAll()[i].title,
          isRoot: this.$divisions.getAll()[i].parentId === 0 ? true : false,
          isExpanded: this.$divisions.getAll()[i].id === 13 || this.$divisions.getAll()[i].id === 16 ? true : false
        });
      }
    }
    console.log('tree', tree);
  };


  /**
   * Выбор структурного подразделения
   * @param item {TreeItem} - выбранный элемент дерева
   */
  selectDivision(item: TreeItem): void {
    console.log(item);
    if (item !== null) {
      this.divisionId = parseInt(item.key);
      this.$phonebook.fetchContactsByDivisionId(this.divisionId).subscribe(() => {
        this.scrollToTop();
      });
    } else {
      this.divisionId = 0;
      this.$phonebook.clear();
    }

  };


  searchForContacts(query: string) {
    if (query.length >= 3) {
      this.$phonebook.searchContacts().subscribe(() => {
        this.scrollToTop();
      });
    } else if (query.length === 2 && this.$phonebook.isInSearchMode() === true) {
      if (this.divisionId !== 0)
        this.$phonebook.fetchContactsByDivisionId(this.divisionId).subscribe(() => {
        this.scrollToTop();
        });
    }
  };


  clearSearch() {
    this.$phonebook.clear();
    this.$phonebook.searchQuery = "";
    if (this.divisionId !== 0)
      this.$phonebook.fetchContactsByDivisionId(this.divisionId).subscribe(() => {
      this.scrollToTop();
      });

  };


  addToFavorites(contact: Contact): void {
    if (this.$phonebook.isContactInFavorites(contact) === false) {
      if (this.$phonebook.isLoading() === false)
        this.$phonebook.addContactToFavorites(contact.id, this.$session.getCurrentUser().id).subscribe();
    } else {
      if (this.$phonebook.isLoading() === false)
        this.$phonebook.deleteContactFromFavorites(contact.id, this.$session.getCurrentUser().id).subscribe();
    }
  };


  scrollToTop(): void {
    let element = document.getElementById('app-contacts');
    element.scrollTop = 0;
  };

}
