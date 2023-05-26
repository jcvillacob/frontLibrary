import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { Loan } from 'src/app/models/loan.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.services';
import { LoanService } from 'src/app/services/loan.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  side: string = "prestamos";
  loans: Loan[] = [];
  activeLoans: Loan[] = [];
  historialLoans: Loan[] = [];
  users: User[] = [];
  verifiedUsers: User[] = [];
  noVerifiedUsers: User[] = [];
  books: Book[] = [];
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
        if (isAuthenticated) {
          this.loanService.getAllLoans().subscribe(loans => {
            this.loans = loans;
            this.activeLoans = this.loans.filter(loan => !loan.returned);
            this.historialLoans = this.loans.filter(loan => loan.returned);
            this.userService.getUsers().subscribe(users => {
              this.users = users;
              this.verifiedUsers = this.users.filter(user => user.verified);
              this.noVerifiedUsers = this.users.filter(user => !user.verified);
            })
          })

        } else { }
      });
    });
  }


  sidebar(dato: string) {
    this.side = dato;
  }

  devolverPrestamo(loan: Loan) {
    if (loan._id) {
      this.loanService.updateLoan(loan._id, { verified: true }).subscribe(loan => {
        this.loanService.getAllLoans().subscribe(loans => {
          this.loans = loans;
          this.activeLoans = this.loans.filter(loan => !loan.returned);
          this.historialLoans = this.loans.filter(loan => loan.returned);
        });
      });
    }
  }

}