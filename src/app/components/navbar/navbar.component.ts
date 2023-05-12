import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @HostBinding('class.openNav') isOpenNav = false;
  @HostBinding('class.openSearch') isOpenSearch = false;
  isSearchIcon = true;

  toggleNav() {
    this.isOpenNav = !this.isOpenNav;
    this.isOpenSearch = false;
    this.isSearchIcon = true;
  }

  closeNav() {
    this.isOpenNav = false;
  }

  toggleSearch() {
    this.isOpenSearch = !this.isOpenSearch;
    this.isOpenNav = false;
    this.isSearchIcon = !this.isSearchIcon;
  }
}
