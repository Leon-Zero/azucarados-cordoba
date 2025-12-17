import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Blogs } from '../../data/interfaces/database/blog.interface';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlBack + '/blog';
  private _blogItem = signal<Blogs[]>([]);

  // getter y setter
  readonly BlogItem = this._blogItem.asReadonly;
  setBlog(blog: Blogs[]) {
    this._blogItem.set(blog);
  }
  updateBlogs(id: number) {
    this._blogItem.update((upd) => upd.filter((upd: any) => upd.id !== id));
  }
  // ------------

  getAllBlogs() {
    return this.http.get<Blogs[]>(this.baseUrl).pipe(
      map((items) => {
        const sorted = [...items].sort((a, b) => b.id - a.id);
        return sorted.map((blog, i) => ({
          id: blog.id,
          title: blog.title,
          resume: blog.resume,
          img: blog.img,
          content: blog.content
        }));
      })
    );
  }

  refreshBlogs() {
    this.getAllBlogs().subscribe(res => {
      this.setBlog(res);
    });
  }

  getBlogForId(id: number) {
    return this.http.get<Blogs[]>(`${this.baseUrl}/${id}`)
  }

  addBlog(blog: Blogs) {
    return this.http.post(`${this.baseUrl}/create`, blog);
  }

  deleteBlog(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  editBlog(data: Blogs) {
    return this.http.put<Blogs>(`${this.baseUrl}/edit`, data).pipe(
      tap(() => this.refreshBlogs())
    );
  }

  generatePath(title: string): string {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }

  scrollToEdit() {
    const el = document.getElementById('blog-edit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToDelete() {
    const el = document.getElementById('blog-delete');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
