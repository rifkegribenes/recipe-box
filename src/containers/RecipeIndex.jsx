import React from 'react';

Object.keys(localStorage).forEach(key => console.log(localStorage[key]));

const RecipeIndex = () => (

  <div>
    <h2>Recipe index</h2>

  </div>
);

export default RecipeIndex;

/*

 const cachedRecipes = localStorage.getItem(recipes);
    if (cachedRecipes) {
      this.setState({ recipes: JSON.parse(cachedRecipes) });
      return;
    }

    */