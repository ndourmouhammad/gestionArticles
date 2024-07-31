import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Comment } from '../comment.model'; // Import Comment model

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: any;
  comments: Comment[] = []; // Property to hold comments

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.articleService.getArticle(id).subscribe(article => {
        this.article = article;
        this.getComments(id); // Fetch comments when article is loaded
      });
    });
  }

  getComments(id: number): void {
    this.articleService.getComments(id).subscribe(comments => {
      this.comments = comments;
    });
  }

  deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  editArticle(id: number): void {
    this.router.navigate(['/article', id, 'edit']);
  }
}
