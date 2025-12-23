import { Component, inject, input } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { Router } from '@angular/router';
import { Blogs } from '../../../data/interfaces/database/blog.interface';

@Component({
  selector: 'app-blog-dashboard',
  imports: [],
  templateUrl: './blog-dashboard.html',
  styleUrl: './blog-dashboard.css',
})
export class BlogDashboard {
  paginatedItems = input.required<Blogs[]>();
  private blogService = inject(BlogService);
  private router = inject(Router);


   goToArticle(blog: string) {
    const path = this.blogService.generatePath(blog);
    this.router.navigate(['/blog/articulo', path]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  

}
