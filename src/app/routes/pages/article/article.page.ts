import { Component, inject, Signal, signal } from '@angular/core';
import { View } from "../../../shared/components/view/view";
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blogs } from '../../../data/interfaces/database/blog.interface';

@Component({
  selector: 'app-article',
  imports: [View],
  templateUrl: './article.page.html',
  styleUrl: './article.page.css',
})
export class ArticlePage {

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  blog = signal<Blogs | null>(null);

  ngOnInit() {
    const path = this.route.snapshot.paramMap.get('slug') ?? '';

    this.blogService.getAllBlogs().subscribe(blogs => {
      const match = blogs.find(b =>
        this.blogService.generatePath(b.title) === path
      );

      this.blog.set(match ?? null);
    });
  }

}
