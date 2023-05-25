import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.services';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  userId: string | null = null;
  userRole: string | null = null;
  book: Book | null = null;
  reviews: Review[] = [];
  likes: string[] = [];
  avgRating: number = 0;  // Mantiene la calificación promedio como un número fraccionario
  fullStars: number = 0;  // Mantiene la parte entera de la calificación promedio
  halfStars: number = 0;  // Mantiene la parte fraccionaria de la calificación promedio
  newReviewText: string = '';
  newReviewRating: number = 1;
  stars = Array(10).fill(0);
  isAuthenticated: boolean = false;
  authSubscription: Subscription = new Subscription(); // Inicializa la propiedad con un valor predeterminado

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bookService: BookService,
    private reviewService: ReviewService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getUserRole();
    const bookId = this.route.snapshot.params['id'];
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.bookService.getBook(bookId).subscribe(book => {
        this.book = book;
        this.reviewService.getReviews(book.title).subscribe(reviews => {
          this.reviews = reviews;
          if (isAuthenticated) {
            this.userService.getUserMe().subscribe(user => {
              if (user.likes) {
                this.likes = user.likes;
              }
            })
          }
          let sum = 0;
          for (let review of reviews) {
            if (review.rating) {
              sum += review.rating;
            }
          }
          if (reviews.length > 0) {
            this.avgRating = sum / reviews.length;
            this.fullStars = Math.floor(this.avgRating);  // Extrae la parte entera
            this.halfStars = this.avgRating - this.fullStars >= 0.5 ? 1 : 0;  // Comprueba si hay una parte fraccionaria
          }
          console.log(this.avgRating);
        });
      });
    });
  }


  anadirMeGusta(bookId: string) {
    if (!this.isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para agregar este libro a tus me gusta.',
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

  submitReview() {
    if (this.newReviewText && this.book) {
      const newReview = { book: this.book.title, comment: this.newReviewText, rating: this.newReviewRating }
      this.reviewService.createReview(newReview).subscribe(() => {
        this.newReviewText = '';
        this.newReviewRating = 1;
        // Recargar las reviews
        if (this.book?.title) {
          this.reviewService.getReviews(this.book.title).subscribe(reviews => {
            this.reviews = reviews;
            let sum = 0;
            for (let review of reviews) {
              if (review.rating) {
                sum += review.rating;
              }
            }
            if (reviews.length > 0) {
              this.avgRating = sum / reviews.length;
              this.fullStars = Math.floor(this.avgRating);  // Extrae la parte entera
              this.halfStars = this.avgRating - this.fullStars >= 0.5 ? 1 : 0;  // Comprueba si hay una parte fraccionaria
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Debes dejar un Comentario',
        showCancelButton: false,
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
  }


  setRating(rating: number) {
    this.newReviewRating = rating;
  }
}
