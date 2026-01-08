import { Component, inject, input, output, signal } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { ToastService } from '../../../core/services/toast.service';
import { ModalConfirm } from '../../ui/modal-confirm/modal-confirm';

@Component({
  selector: 'form-blog-delete',
  imports: [ModalConfirm],
  templateUrl: './blog-delete.form.html',
  styleUrl: './blog-delete.form.css',
})
export class BlogDeleteForm {
  private blogService = inject(BlogService);
  private toastService = inject(ToastService);
  object = output<any>();
  onEdit = input<boolean>(false);

  confirmOpen = signal(false);
  pendingDeleteId = signal<number | null>(null);
  pendingDeleteTitle = signal<string>('');

  get blogs() {
    return this.blogService.BlogItem();
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

  setObject(obj: any): void {
    this.object.emit(obj);
  }

  getForId(id: number) {
    this.blogService.getBlogForId(id).subscribe({
      next: (res) => {
        this.setObject(res);
        this.blogService.scrollToEdit();
      },
      error: (err) => {
        console.error('error al buscar por id', err);
      },
    });
  }

  async confirmDelete() {
    const id = this.pendingDeleteId();
    if (id === null) return;

    this.blogService.deleteBlog(id).subscribe({
      next: () => {
        this.toastService.success('Blog / Noticia eliminado con éxito!');
        this.blogService.updateBlogs(id);
        this.cancelDelete();
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('ERROR al eliminar Blog / Noticia');
      },
    });
  }

  requestDelete(id: number, title: string) {
    this.pendingDeleteId.set(id);
    this.pendingDeleteTitle.set(title);
    this.confirmOpen.set(true);
  }

  cancelDelete() {
    this.confirmOpen.set(false);
    this.pendingDeleteId.set(null);
    this.pendingDeleteTitle.set('');
  }
}
