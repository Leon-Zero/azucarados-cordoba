import { Component, inject, Signal, signal } from '@angular/core';
import { View } from "../../../shared/components/view/view";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blogs } from '../../../data/interfaces/database/blog.interface';
import { Btn } from "../../../shared/ui/btn/btn";

@Component({
  selector: 'app-article',
  imports: [View, Btn, RouterLink],
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
        this.blogService.generatePath(b.title + b.id) === path
      );

      this.blog.set(match ?? null);
    });
  }

}
