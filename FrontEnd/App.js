import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    ingredients: [],
    preparationTime: 0,
    cookingTime: 0,
  });
  const [user, setUser] = useState({ loggedIn: false, token: "" });
  const [recipes, setRecipes] = useState([]);
  const [ingredientForm, setIngredientForm] = useState({});

  const handleForm = (e) =>
    setRecipeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const signupSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/auth/signUp",
        method: "post",
        data: recipeData, // Change data to recipeData
      });
      window.alert(res.data.msg);
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/auth/login",
        method: "post",
        data: recipeData, // Change data to recipeData
      });
      window.alert(res.data.msg);
      if (res.data.token) setUser({ loggedIn: true, token: res.data.token });
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  useEffect(() => {
    if (user.loggedIn && user.token !== "") getRecipes(); // Change getMybooks to getRecipes
  }, [user]);

  const getRecipes = async () => {
    try {
      const res = await axios({
        url: "http://localhost:5600/recipes", // Change endpoint to fetch recipes
        method: "get",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRecipes(res.data.recipes); // Update state with recipes
    } catch (e) {
      console.error(e);
      window.alert("ERROR");
    }
  };

  const handleAddIngredientForm = (e) =>
    setIngredientForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addIngredient = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:5600/ingredients/addIngredient", // Change endpoint to addIngredient
        method: "post",
        data: ingredientForm,
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.data.msg === "INGREDIENT ADDED") console.log("Ingredient added"); // Handle success
    } catch (e) {
      console.error(e);
      window.alert("ERROR");
    }
  };

  return (
    <div className="mera-dabba">
      {user.loggedIn ? (
        <div style={{ margin: 50, display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            {recipes.length > 0 ? (
              <div>
                <h1>Your recipes. Click to view details</h1>
                <ul>
                  {recipes.map((recipe) => (
                    <li
                      key={recipe._id}
                      onClick={() => console.log(recipe)} // Change to handle click event
                    >
                      {recipe.title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h1>NO RECIPES FOUND</h1>
            )}
          </div>
          <div>
            <form
              onSubmit={addIngredient}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1>Add Ingredient</h1>
              <input
                type="text"
                name="name"
                value={ingredientForm.name}
                onChange={handleAddIngredientForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="description"
                value={ingredientForm.description}
                onChange={handleAddIngredientForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="category"
                value={ingredientForm.category}
                onChange={handleAddIngredientForm}
                style={{ margin: 5 }}
              />
              <input
                type="number"
                name="quantity"
                value={ingredientForm.quantity}
                onChange={handleAddIngredientForm}
                style={{ margin: 5 }}
              />
              <input
                type="text"
                name="unit"
                value={ingredientForm.unit}
                onChange={handleAddIngredientForm}
                style={{ margin: 5 }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div style={{ margin: 50 }}>
            <form
              onSubmit={signupSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1>Signup</h1>
              <input
                type="text"
                name="email"
                value={recipeData.email}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="password"
                name="password"
                value={recipeData.password}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div>
            <form
              onSubmit={loginSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1>Login</h1>
              <input
                type="text"
                name="email"
                value={recipeData.email}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <input
                type="password"
                name="password"
                value={recipeData.password}
                onChange={handleForm}
                style={{ margin: 5 }}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
