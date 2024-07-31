import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, ArticleFormComponent],
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: any[] = [];
  isFormVisible = false;
  selectedArticle: any;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  addNewArticle(): void {
    this.selectedArticle = null;
    this.isFormVisible = true;
  }

  editArticle(article: any): void {
    this.selectedArticle = article;
    this.isFormVisible = true;
  }

  clearSelectedArticle(): void {
    this.selectedArticle = null;
    this.isFormVisible = false;
  }

  deleteArticle(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas revenir en arrière après cette action !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe(() => {
          this.articles = this.articles.filter(article => article.id !== id);
          Swal.fire({
            title: 'Supprimé !',
            text: 'L\'article a été supprimé.',
            icon: 'success',
            timer: 2000,  // Duration in milliseconds
            showConfirmButton: false
          });
        }, error => {
          Swal.fire({
            title: 'Erreur !',
            text: 'Une erreur est survenue lors de la suppression de l\'article.',
            icon: 'error',
            timer: 2000,  // Duration in milliseconds
            showConfirmButton: false
          });
        });
      }
    });
  }
  

  onArticleAddedOrUpdated(article: any): void {
    this.loadArticles();
    this.isFormVisible = false;
  }
}
