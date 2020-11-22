import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipes/recipe.model';

import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .post(
        'https://ng-recipe-cookbook-app.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        'https://ng-recipe-cookbook-app.firebaseio.com/recipes.json'
      )
      .subscribe((recipes) => {
        this.recipesService.setRecipes(recipes);
      });
  }
}