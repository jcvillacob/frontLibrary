import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { Loan } from 'src/app/models/loan.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.services';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  likes: string[] = [];
  books: Book[] = [];
  loans: Loan[] = [];
  likedBooks: Book[] = [];
  isAuthenticated: boolean = false;
  authSubscription: Subscription = new Subscription(); // Inicializa la propiedad con un valor predeterminado

  constructor(private bookService: BookService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.bookService.getBooks().subscribe(books => {
        this.books = books;
        this.likedBooks = books;
        if (isAuthenticated) {
          this.userService.getUserMe().subscribe(user => {
            if (user.likes) {
              this.likes = user.likes;
              this.likedBooks = this.books.filter(book => this.likes.includes(book._id));
              this.loanService.getSelfLoans().subscribe(loans => {
                this.loans = loans;
                console.log(loans);
              });
            }
          })
        }
      });
    });
  }
}

