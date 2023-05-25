import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  filteredBooks: Book[] = [];
  featuredAuthors: string[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filterRandomBooks();
    });
  }

  filterRandomBooks(): void {
    this.books.sort(() => Math.random() - 0.5);
    this.filteredBooks = this.books.slice(0, 4);
  
    // Obtener los autores de los libros filtrados
    const authors = this.filteredBooks.map(book => book.author);
  
    // Crear una lista con los 3 primeros autores
    this.featuredAuthors = authors.slice(0, 3);
  }


}
