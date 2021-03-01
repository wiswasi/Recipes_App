import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  // Recipe Application ID and KEY from the edamam.com API
  const APP_ID = "f4688a13";
  const APP_KEY = "188ee770db5793f90330c6a8810317fa";

  // setting the useStates for the input and search states
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  // useEffect runs only when [] changes
  useEffect(() => {
    getRecipes();
  }, [query]);     // get a new request everytime search is called

  const getRecipes = async () => {
    // Once the request is sent, the response awaits before fetching the data
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  // Every time the user searches, update with the value of e (event)
  const updateSearch = e =>{
    setSearch(e.target.value);
  };

  // Searches the input after user clicks search
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
