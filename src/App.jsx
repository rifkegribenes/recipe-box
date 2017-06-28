import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Link,
} from 'react-router-dom';

import RecipeIndex from './containers/RecipeIndex';
import NewRecipe from './containers/NewRecipe';
import EditRecipe from './containers/EditRecipe';
import ViewRecipe from './containers/ViewRecipe';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <h1>Recipe box</h1>
          <ul className="nav">
            <li className="nav__item"><Link to="/">All Recipes</Link></li>
            <li className="nav__item"><Link to="/new">New Recipe</Link></li>
          </ul>

          <Route exact path="/" component={RecipeIndex} />
          <Route path="/new" component={NewRecipe} />
          <Route path="/edit/:key" component={EditRecipe} />
           <Route path="/recipes/:key" component={ViewRecipe} />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
