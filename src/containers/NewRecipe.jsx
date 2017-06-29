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
        ingredientString: '',
        instructionString: '',
        categories: [],
        source: {},
      },
    recipes: JSON.parse(localStorage.getItem('recipes')),
    msg: false,
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
   // localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

handleChange({target}) {
	this.setState({newRecipe: {...this.state.newRecipe, [target.name]: target.value}});
  let adjustedHeight = target.clientHeight;
  adjustedHeight = Math.max(target.scrollHeight, adjustedHeight);
  if (adjustedHeight > target.clientHeight)
    target.style.height = adjustedHeight + "px";
}

handleSubmit(event) {
	event.preventDefault();
	const key = shortid.generate();
	let ingredients = this.state.newRecipe.ingredientString.split('\n');
	let instructions = this.state.newRecipe.instructionString.split('\n');
	let recipes = {...this.state.recipes};
  	const newRecipe = {...this.state.newRecipe, key, ingredients, instructions};
  	this.setState(prevState => {
     const recipes = {...prevState.recipes, [newRecipe.key]: newRecipe};
     return {
     recipes: recipes,
     msg: true,
     newRecipe: {
        title: '',
        ingredientString: '',
        ingredients: [],
        instructionString: '',
        instructions: [],
        categories: [],
        source: {},
      },
     };
   });
   setTimeout(() => {
        this.setState({
          msg: false,
        });
  this.props.history.push('/');
      }, 2000);

  }

  componentWillUnmount() {
  	localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

render() {
	const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const { title, ingredientString, instructionString, categories } = this.state.newRecipe;
    return (
      <div>
        <h2 className="newRecipe__banner">.:: Add Recipe ::.</h2>
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
              name="ingredientString" onChange={e => this.handleChange(e)}
              placeholder="List of ingredients, one per line"
              value={ingredientString}
            />
            <textarea
              className="newRecipe__input c3 newRecipe__textarea"
              type="text" name="instructionString"
              onChange={e => this.handleChange(e)}
              placeholder="List of instructions, one per line"
              value={instructionString}
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
            ><span>Create Recipe</span></button>
            <Link
              to="/"
              className="newRecipe__cancel newRecipe__button"
            ><span>Cancel</span></Link>
            </div>
            {this.state.msg && <div className="recipeInd__message">Your recipe was saved.</div>}
          </form>
        </div>
      </div>
    );
  }
}

export default NewRecipe;
