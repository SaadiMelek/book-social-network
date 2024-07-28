import {Component, OnInit} from '@angular/core';
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {BookService} from "../../../../services/services/book.service";
import {Router} from "@angular/router";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit {

  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooksByOwner();
  }

  private findAllBooksByOwner() {
    this.bookService.findAllBooksByOwner({ page: this.page, size: this.size })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
        }
      })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooksByOwner();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooksByOwner();
  }

  goToPage(pageIndex: number) {
    this.page = pageIndex;
    this.findAllBooksByOwner();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooksByOwner();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number -1;
    this.findAllBooksByOwner();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      "book-id": book.id as number
    }).subscribe({
      next: () => {
        book.archived = !book.archived;
      }
    });
  }

  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus({
      "book-id": book.id as number
    }).subscribe({
      next: () => {
        book.shareable = !book.shareable;
      }
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
  }
}
