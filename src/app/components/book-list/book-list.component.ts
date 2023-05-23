import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchKeyword: string = '';
  selectedAuthor: string = '';
  selectedYear: number = 0;
  selectedEditorial: string = '';

  authors: string[] = [];
  years: number[] = [];
  editorials: string[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
      this.populateFilters();
    });
  }

  populateFilters(): void {
    // Usa 'filter' y 'indexOf' para eliminar duplicados
    this.authors = this.filteredBooks.map(book => book.author)
                                      .filter((value, index, self) => self.indexOf(value) === index);

    this.editorials = this.filteredBooks.map(book => book.editorial.name)
                                         .filter((value, index, self) => self.indexOf(value) === index);

    this.years = this.filteredBooks.map(book => book.publicationYear)
                                    .filter((value, index, self) => self.indexOf(value) === index);
  }

  filterBooks() {
    this.filteredBooks = this.books.filter(
      book => (this.searchKeyword === '' || book.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) || book.author.toLowerCase().includes(this.searchKeyword.toLowerCase()) || book.ISBN.includes(this.searchKeyword) || book.category.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) || book.editorial.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) || String(book.publicationYear).includes(this.searchKeyword))
        && (this.selectedAuthor === '' || book.author === this.selectedAuthor)
        && (this.selectedYear == 0 || book.publicationYear == this.selectedYear)
        && (this.selectedEditorial === '' || book.editorial.name === this.selectedEditorial)
    );
    this.populateFilters();
  }

  onFilterChange() {
    this.filterBooks();
  }
}
