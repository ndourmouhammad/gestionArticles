import Swal from 'sweetalert2';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnChanges {

  articleForm: FormGroup;
  @Input() article: any; // Reçoit l'article à modifier
  @Output() articleSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required] // Assurez-vous que ce nom est correct
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && this.article) {
      this.articleForm.patchValue(this.article);
    }
  }

  

  onSubmit(): void {
    const articleData = this.articleForm.value;
  
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous soumettre ces informations ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, soumettre !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.article && this.article.id) {
          // Mise à jour de l'article existant
          this.articleService.updateArticle(this.article.id, articleData).subscribe(updatedArticle => {
            Swal.fire({
              title: 'Mis à jour !',
              text: 'L\'article a été mis à jour avec succès.',
              icon: 'success',
              timer: 2000,  // Duration in milliseconds
              showConfirmButton: false
            });
            this.articleSubmitted.emit(updatedArticle);
          }, error => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Une erreur est survenue lors de la mise à jour de l\'article.',
              icon: 'error',
              timer: 2000,  // Duration in milliseconds
              showConfirmButton: false
            });
          });
        } else {
          // Création d'un nouvel article
          this.articleService.createArticle(articleData).subscribe(newArticle => {
            Swal.fire({
              title: 'Créé !',
              text: 'L\'article a été créé avec succès.',
              icon: 'success',
              timer: 2000,  // Duration in milliseconds
              showConfirmButton: false
            });
            this.articleSubmitted.emit(newArticle);
          }, error => {
            Swal.fire({
              title: 'Erreur !',
              text: 'Une erreur est survenue lors de la création de l\'article.',
              icon: 'error',
              timer: 2000,  // Duration in milliseconds
              showConfirmButton: false
            });
          });
        }
      }
    });
  }
  
}


