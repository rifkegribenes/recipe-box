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
        ingredientString: '',
        instructionString: '',
        categories: [],
        source: {},
      },
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.adjustTextArea = this.adjustTextArea.bind(this);
  }

  componentDidMount() {
  	const recipe = this.state.recipes[this.state.key];
  	this.setState({ recipe });
  	this.adjustTextArea(this.textInput);
  	this.adjustTextArea(this.textInput2);
  }

adjustTextArea(target) {
  let adjustedHeight = target.clientHeight;
  adjustedHeight = Math.max(target.scrollHeight, adjustedHeight);
  if (adjustedHeight > target.clientHeight)
    target.style.height = adjustedHeight + 20 + "px";
}

handleChange({target}) {
	this.setState({recipe: {...this.state.recipe, [target.name]: target.value}});
    this.adjustTextArea(target);
  }

handleSubmit(event) {
	event.preventDefault();
	let recipes = {...this.state.recipes}
    let key = this.state.key;
    let ingredients = this.state.recipe.ingredientString.split('\n');
    let instructions = this.state.recipe.instructionString.split('\n');
    this.setState({
      recipe: {
        ingredients,
        instructions
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
    const { title, ingredientString, ingredients, instructions, instructionString, categories } = this.state.recipe;
    let lineLength = window.innerWidth > 920 ? 90 : (window.innerWidth-100)/10;
    let ingOverflow = ingredients.filter((ing) => ing.length>lineLength);
    let instOverflow = instructions.filter((inst) => inst.length>lineLength);
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
              name="ingredientString" ref={(input) => { this.textInput = input; }} onChange={e => this.handleChange(e)}
              placeholder="List of ingredients, one per line"
              value={ingredientString}
              rows={ingredients.length+ingOverflow.length}
            />
            <textarea
              className="newRecipe__input c3 newRecipe__textarea"
              type="text" name="instructionString" ref={(input) => { this.textInput2 = input; }}
              onChange={e => this.handleChange(e)}
              placeholder="List of instructions, one per line"
              value={instructionString}
              rows={instructions.length+instOverflow.length}
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
