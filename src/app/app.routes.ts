// import { Routes } from '@angular/router';
// import { ArticleListComponent } from './article-list/article-list.component';
// import { ArticleFormComponent } from './article-form/article-form.component';
// import { ArticleDetailComponent } from './article-detail/article-detail.component';


// export const routes: Routes = [
//   { path: '', component: ArticleListComponent },
//   { path: 'article/new', component: ArticleFormComponent },
//   { path: 'article/edit/:id', component: ArticleFormComponent },
//   { path: 'article/:id', component: ArticleDetailComponent },
// ];

import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleFormComponent } from './article-form/article-form.component';

export const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'article/new', component: ArticleFormComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'article/:id/edit', component: ArticleFormComponent }
];


