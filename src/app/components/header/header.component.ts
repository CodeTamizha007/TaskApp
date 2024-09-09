import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  searchTerm:any='';

  private searchSubject: Subject<string> = new Subject();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500)).subscribe((id: string) => {
      if (id) {
        this.router.navigate(['/user', id]);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.urlAfterRedirects === '/') {
          this.clearSearchInput();
        }
      }
    });
  }

  onSearch(event: any): void {
    const id = event.target.value.trim();

    if (id) {
      this.searchSubject.next(id);
    } else {
      this.router.navigate(['/']);
    }
  }

  clearSearchInput(): void {
    this.searchTerm = '';
  }
}
