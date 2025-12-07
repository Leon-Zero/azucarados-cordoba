import { Component, inject, input, output } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'form-blog-delete',
  imports: [],
  templateUrl: './blog-delete.form.html',
  styleUrl: './blog-delete.form.css',
})
export class BlogDeleteForm {

  private blogService = inject(BlogService);
  private toastService = inject(ToastService);
  object = output();
  onEdit = input<boolean>(false);

  get blogs() {
    return this.blogService.BlogItem();
  }

  setObject(obj: any): void {
    return this.object.emit(obj);
  }


  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (res) => {
        this.blogService.setBlog(res);
      },
    });
  }

  // getForId(id: number) {
  //   this.blogService.getBlogForId(id).subscribe(
  //     {
  //       next: (res) => {
  //         console.log('item por id', res);
  //         this.setObject(res);
  //         this.blogService.scrollToEdit();
  //       }, error: (err) => {
  //         console.log('error al buscar por id', err);
  //       }
  //     }
  //   );
  // }

  deleteBlog(id: number) {
    console.log(typeof id, id);
    this.blogService.deleteBlog(id).subscribe(
      {
        next: () => {
          this.toastService.success('Blogs/Noticia eliminado con exito!')
          this.blogService.updateBlogs(id);
        }, error: (err) => {
          this.toastService.error('ERROR al eliminar Blogs/Noticia')
          console.log("error al eliminar", err);
        }
      }
    );
  }


}
