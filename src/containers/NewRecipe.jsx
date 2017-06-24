import React from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

class NewRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	newRecipe: {
    		key: null,
        title: '',
        ingredients: [],
        instructions: [],
        notes: '',
        categories: [],
        tags: [],
        imgUrl: '',
        imgAlt: '',
        imgSuccess: '',
        imgProgress: '',
      },
      recipes: [],
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(event) {
    const newRecipe = Object.assign({}, this.state.newRecipe);
    newRecipe[event.target.name] = event.target.value;
    this.setState({
      newRecipe,
    });
  }

handleSubmit(event) {
	event.preventDefault();
	const newRecipe = Object.assign({}, this.state.newRecipe);
	const recipes = Object.assign([], this.state.recipes);
	const key = shortid.generate();
	newRecipe.key = key;
	console.log(key)
	console.log(newRecipe);
  localStorage.setItem(key, JSON.stringify(this.state.newRecipe));
  this.setState({newRecipe});
  recipes.push(newRecipe);
  const cachedRecipes = localStorage.getItem('recipes');
	Object.keys(localStorage).forEach(key => console.log(localStorage[key]));
  // this.props.history.push('/');
  }

render() {
	const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const { title, imgUrl, imgAlt, ingredients, imgSuccess, imgProgress, instructions, notes, categories, tags } = this.state.newRecipe;
    return (
      <div>
        <h2 className="newRecipe__banner">Add Recipe</h2>
        <div className="newRecipe__container">
          <form className="newRecipe__form">
            <input
              className="newRecipe__input"
              type="text" name="title"
              onChange={e => this.handleChange(e)}
              placeholder="Recipe Title"
              value={title}
            />
            <br />
            <textarea
              className="newRecipe__input"
              name="ingredients" onChange={e => this.handleChange(e)}
              placeholder="List of ingredients, separated by commas"
              value={ingredients}
            />
            <br />
            <input
              className="newRecipe__input"
              type="text" name="instructions"
              onChange={e => this.handleChange(e)}
              placeholder="List of instructions, separated by commas"
              value={instructions}
            />
            <br />
            <button
              className="newRecipe__submit newRecipe__button"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >Create Recipe</button>
            <Link
              to="/index"
              className="newRecipe__cancel newRecipe__button"
            >Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default NewRecipe;
