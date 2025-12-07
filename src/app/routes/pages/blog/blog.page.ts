import { Component, inject, OnInit } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { PagControl } from '../../../shared/ui/pag-control/pag-control';
import { PaginationService } from '../../../core/services/pagination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blogs } from '../../../data/interfaces/database/blog.interface';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [HeaderLayout, PagControl],
  templateUrl: './blog.page.html',
  styleUrl: './blog.page.css',
})
export class BlogPage implements OnInit {
  private blogService = inject(BlogService);
  private pagination = inject(PaginationService<Blogs>);

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadBlogs();

    this.route.paramMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      this.pagination.setPage(page);
    });
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe((items: Blogs[]) => {
      this.pagination.setItems(items);
      this.pagination.setItemsPerPage(4);
    });
  }

  // getters
  get currentPage() {
    return this.pagination.currentPage();
  }
  get totalPages() {
    return this.pagination.totalPages();
  }
  get paginatedItems() {
    return this.pagination.paginatedItems();
  }

  //navigation
  goToPage(page: number) {
    this.pagination.setPage(page);
    this.router.navigate(['/blog/pagina', page]);
  }

  // private http = inject(HttpClient);
  // private pagination = inject(PaginationService<Blog>);
  // private route = inject(ActivatedRoute);
  // private router = inject(Router);

  // ngOnInit() {
  //   this.http.get<Blog[]>('/blog.json').subscribe((posts) => {
  //     this.pagination.setItems(posts);
  //     this.pagination.setItemsPerPage(5);
  //   });

  //   // nº page ruta
  //   this.route.paramMap.subscribe((params) => {
  //     const page = Number(params.get('page')) || 1;
  //     this.pagination.setPage(page);
  //   });
  // }

  // //getters
  // get paginatedPosts() {
  //   return this.pagination.paginatedItems();
  // }
  // get currentPage() {
  //   return this.pagination.currentPage();
  // }
  // get totalPages() {
  //   return this.pagination.totalPages();
  // }

  // //navigation
  // goToPage(page: number) {
  //   this.pagination.setPage(page);
  //   this.router.navigate(['/blog/pagina', page]);
  // }
}
