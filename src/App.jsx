import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom';

import RecipeIndex from './containers/RecipeIndex';
import NewRecipe from './containers/NewRecipe';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>Recipe box</h1>
          <ul>
            <li><Link to="/">All Recipes</Link></li>
            <li><Link to="/new">New Recipe</Link></li>
          </ul>

          <Route exact path="/" component={RecipeIndex} />
          <Route path="/new" component={NewRecipe} />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
