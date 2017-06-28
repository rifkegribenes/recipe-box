import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.match.params.key,
      recipes: {...JSON.parse(localStorage.getItem('recipes'))},
      recipe: {
        title: '',
        ingredients: [],
        instructions: [],
        categories: [],
      },
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  	const recipe = this.state.recipes[this.state.key];
  	this.setState({ recipe });
  }

handleChange({target}) {
	this.setState({recipe: {...this.state.recipe, [target.name]: target.value}});
  }

handleSubmit(event) {
	event.preventDefault();
	let recipes = {...this.state.recipes}
    let key = this.state.key;
    let ingredients = this.state.recipe.ingredients.split('\n');
    let instructions = this.state.recipe.instructions.split('\n');
    this.setState({
      recipe: {
        ingredients,
        instructions,
      }
    })
    recipes[key] = this.state.recipe;
    this.setState(prevState => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.props.history.push('/');
    return { recipes };
   });
  }

render() {
    const { title, ingredients, instructions, categories } = this.state.recipe;
    return (
      <div>
        <h2 className="newRecipe__banner">.:: Update Recipe ::.</h2>
        <div className="newRecipe__container">
          <form className="newRecipe__form">
            <input
              className="newRecipe__input c1"
              type="text" name="title"
              onChange={e => this.handleChange(e)}
              placeholder="Recipe Title"
              value={title}
            />
            <textarea
              className="newRecipe__input c2 newRecipe__textarea"
              name="ingredients" onChange={e => this.handleChange(e)}
              placeholder="List of ingredients, one per line"
              value={ingredients}
              rows="5"
            />
            <textarea
              className="newRecipe__input c3 newRecipe__textarea"
              type="text" name="instructions"
              onChange={e => this.handleChange(e)}
              placeholder="List of instructions, one per line"
              value={instructions}
              rows="5"
            />
            <input
              className="newRecipe__input c4"
              type="text" name="categories"
              onChange={e => this.handleChange(e)}
              placeholder="List of categories, separated by commas"
              value={categories}
            />
            <div className="newRecipe__buttoncont">
            <button
              className="newRecipe__submit newRecipe__button"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >Save Recipe</button>
            <Link
              to="/"
              className="newRecipe__cancel newRecipe__button"
            >Cancel</Link>
            </div>
            {this.state.msg && <div className="recipeInd__message">Your recipe was saved.</div>}
          </form>
        </div>
      </div>
    );
  }
}

export default EditRecipe;
