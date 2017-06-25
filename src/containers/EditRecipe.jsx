import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.match.params.key,
      recipes: {...JSON.parse(localStorage.getItem('recipes'))},
      recipe: {},
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  	console.dir(this.state.recipes);
  	console.log(this.state.key);
  	const recipe = this.state.recipes[this.state.key];
  	this.setState({ recipe });
  	console.log(this.state.recipe);
  }

handleChange({target}) {
	this.setState({recipe: {...this.state.recipe, [target.name]: target.value}});
  }

handleSubmit(event) {
	event.preventDefault();
	let recipes = {...this.state.recipes}
  let key = this.state.key;
  recipes[key] = recipe;
  this.setState(prevState => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.props.history.push('/');
    return { recipes };
   });
  }

render() {
    const { title, imgUrl, imgAlt, ingredients, imgSuccess, imgProgress, instructions, notes, categories, tags } = this.state.recipe;
    return (
      <div>
        <h2 className="newRecipe__banner">Update Recipe</h2>
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
            <input
              className="newRecipe__input"
              type="text" name="categories"
              onChange={e => this.handleChange(e)}
              placeholder="List of categories, separated by commas"
              value={categories}
            />
            <br />
            <input
              className="newRecipe__input"
              type="text" name="tags"
              onChange={e => this.handleChange(e)}
              placeholder="List of tags, separated by commas"
              value={tags}
            />
            <br />
            <button
              className="newRecipe__submit newRecipe__button"
              type="submit"
              onClick={e => this.handleSubmit(e)}
            >Update Recipe</button>
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

export default EditRecipe;
