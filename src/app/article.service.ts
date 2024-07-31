// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Article } from './article.module';

// @Injectable({
//   providedIn: 'root'
// })
// export class ArticleService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

//   constructor(private http: HttpClient) { }

//   getArticles(): Observable<Article[]> {
//     return this.http.get<Article[]>(this.apiUrl);
//   }

//   getArticle(id: number): Observable<Article> {
//     return this.http.get<Article>(`${this.apiUrl}/${id}`);
//   }

//   createArticle(article: Article): Observable<Article> {
//     return this.http.post<Article>(this.apiUrl, article);
//   }

//   updateArticle(id: number, article: Article): Observable<Article> {
//     return this.http.put<Article>(`${this.apiUrl}/${id}`, article);
//   }

//   deleteArticle(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Article } from './article.module';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private articles: Article[] = []; // In-memory array

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    if (this.articles.length) {
      return of(this.articles);
    } else {
      return this.http.get<Article[]>(this.apiUrl).pipe(
        map(articles => {
          this.articles = articles;
          return articles;
        }),
        catchError(this.handleError<Article[]>('getArticles', []))
      );
    }
  }

  getArticle(id: number): Observable<Article> {
    const article = this.articles.find(a => a.id === id);
    if (article) {
      return of(article);
    }
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article).pipe(
      map(newArticle => {
        this.articles.push(newArticle);
        return newArticle;
      }),
      catchError(this.handleError<Article>('createArticle'))
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${id}`, article).pipe(
      map(updatedArticle => {
        const index = this.articles.findIndex(a => a.id === id);
        if (index !== -1) {
          this.articles[index] = updatedArticle;
        }
        return updatedArticle;
      }),
      catchError(this.handleError<Article>('updateArticle'))
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      }),
      catchError(this.handleError<void>('deleteArticle'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
