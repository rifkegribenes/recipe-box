import React, { Component } from 'react';

class ViewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.match.params.key,
      recipes: {...JSON.parse(localStorage.getItem('recipes'))},
      recipe: {},
    };
  }

  componentWillMount() {
    const key = this.state.key;
    const recipe = this.state.recipes[key];
      this.setState({
        recipe,
      });
     console.log(this.state.recipe);
    }


  render() {
    const { title, ingredients, instructions, source, categories } = this.state.recipe;
    return (
      <div>
        {!title ?
          <div className="vr__loader">Loading...</div> :
          <div className="vr__container">
            <h2 className="vr__title">{title}</h2>
           {source && <p className="vr__meta">SOURCE: <a href={source.url} target="_blank">{source.name}</a></p> }
            <h3 className="vr__subhead">Ingredients</h3>
            <div className="vr__listcont">
            <ul className="vr__list">{ingredients.map((ingredient, index)=> {
          return(
          <li className="vr__listItem" key={index}>{ingredient}</li>
          )
        })}</ul>
            </div>
            <h3 className="vr__subhead">Instructions</h3>
            <div className="vr__listcont">
            <ul className="vr__list">{instructions.map((instruction, index)=> {
          return(
          <li className={ `vr__listItem c${index+1}` } key={index}>{instruction}</li>
          )
        })}</ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ViewRecipe;
