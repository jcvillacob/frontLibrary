import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.services';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchKeyword: string = '';
  selectedAuthor: string = '';
  selectedYear: number = 0;
  selectedEditorial: string = '';
  selectedCategory: string = '';
  authors: string[] = [];
  years: number[] = [];
  editorials: string[] = [];
  categories: string[] = [];
  likes: string[] = [];
  isAuthenticated: boolean = false;
  authSubscription: Subscription = new Subscription(); // Inicializa la propiedad con un valor predeterminado
  loader: boolean = true;

  constructor(private bookService: BookService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.bookService.getBooks().subscribe(books => {
        this.books = books;
        this.filteredBooks = books;
        this.populateFilters();
        if (isAuthenticated) {
          this.userService.getUserMe().subscribe(user => {
            if (user.likes) {
              this.likes = user.likes;
            }
          })
        }
        setTimeout(() => {
          this.loader = false;
        }, 1000);
      });
    });
  }

  populateFilters(): void {
    // Usa 'filter' y 'indexOf' para eliminar duplicados
    this.authors = this.filteredBooks.map(book => book.author).filter((value, index, self) => self.indexOf(value) === index);
    this.editorials = this.filteredBooks.map(book => book.editorial.name).filter((value, index, self) => self.indexOf(value) === index);
    this.categories = this.filteredBooks.map(book => book.category.name).filter((value, index, self) => self.indexOf(value) === index);
    this.years = this.filteredBooks.map(book => book.publicationYear).filter((value, index, self) => self.indexOf(value) === index);
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(
      book => (this.searchKeyword === '' || book.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) || book.author.toLowerCase().includes(this.searchKeyword.toLowerCase()) || book.ISBN.includes(this.searchKeyword) || book.category.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) || book.editorial.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) || String(book.publicationYear).includes(this.searchKeyword))
        && (this.selectedAuthor === '' || book.author === this.selectedAuthor)
        && (this.selectedYear == 0 || book.publicationYear == this.selectedYear)
        && (this.selectedEditorial === '' || book.editorial.name === this.selectedEditorial)
        && (this.selectedCategory === '' || book.category.name === this.selectedCategory)
    );
    this.populateFilters();
  }

  onFilterChange() {
    this.filterBooks();
  }

  anadirMeGusta(bookId: string) {
    if (!this.isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para agregar este libro a tus favoritos.',
        showCancelButton: true,
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.userService.createMeGusta(bookId).subscribe((user) => {
        if (user.likes) {
          this.likes = user.likes;
        }
      });
    }
  }

  eliminarMeGusta(bookId: string) {
    this.userService.deleteMeGusta(bookId).subscribe(user => {
      if (user.likes) {
        this.likes = user.likes;
      }
    });
  }
}
