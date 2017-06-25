import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

class NewRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	newRecipe: {
        title: '',
        ingredients: [],
        instructions: [],
        categories: [],
        tags: [],
      },
    recipes: JSON.parse(localStorage.getItem('recipes')),
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

handleChange({target}) {
	this.setState({newRecipe: {...this.state.newRecipe, [target.name]: target.value}});
  }

handleSubmit(event) {
	event.preventDefault();
	const key = shortid.generate();
	let recipes = {...this.state.recipes}
  this.setState(prevState => {
  	const newRecipe = {...prevState.newRecipe, key: key};
  	recipes[key] = newRecipe
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.props.history.push('/');
    return { recipes };
   });   
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
