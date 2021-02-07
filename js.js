// search button Handler
document.getElementById('btn').addEventListener('click', () => {
    const getFoodName = document.getElementById('getInput');
    const mainDiv = document.getElementById('elementBox');
    mainDiv.innerHTML = "";
    findData(getFoodName.value);
    getFoodName.value = "";
})
// fetching api
const findData = (names) => {
    const updateName = names.toUpperCase();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${updateName}`)
        .then(response => response.json())
        .then(data => {
            const mainDiv = document.getElementById('elementBox');
            const errorMessage = document.getElementById('showNone');
            const AllMeals = data.meals;
            // input cant be empty thats why it show you must input a food name
            if (updateName == "") {
                mainDiv.style.display = 'none';
                errorMessage.style.display = 'block';
            }
            // if input not empty then program will enter here
            else {

                mainDiv.style.display = 'flex';
                errorMessage.style.display = 'none';
                const AllItems = AllMeals.map(item => {
                    errorMessage.style.display = 'none';
                    mainDiv.style.display = 'flex';
                    console.log(item);
                    const imageLink = item.strMealThumb;
                    const newDiv = document.createElement('div');
                    newDiv.className = 'newDiv';
                    newDiv.id = 'item-box';
                    const newDivInfo =
                        `
                     <div id="image-div"><img class="image-design" src="${imageLink}" alt=""></div>
                       <h4> ${item.strMeal}</h4>
                       
                           `
                    newDiv.innerHTML = newDivInfo;
                    mainDiv.appendChild(newDiv);
                    newDiv.style.backgroundColor = 'white';
                    const itemDetails = document.createElement('div');
                    itemDetails.innerHTML = "";
                    itemDetails.className = 'item-details';
                    newDiv.addEventListener('click', () => {
                        // it display all of the item ingredients
                        if (itemDetails.innerHTML == "") {

                            itemDetails.style.display = 'block';
                            console.log('click hoise');
                            const itemDetailsInfo =
                                `
                                <hr>
                        <h5>Ingredients</h5>
                        <p>${item.strIngredient1}</p>
                        <p>${item.strIngredient2}</p>
                        <p>${item.strIngredient3}</p>
                        <p>${item.strIngredient4}</p>
                        <p>${item.strIngredient5}</p>
                        <p>${item.strIngredient6}</p>
                        <p>${item.strIngredient7}</p>
                        
                        `
                            itemDetails.innerHTML = itemDetailsInfo;
                            newDiv.appendChild(itemDetails);
                        }

                        else {
                            itemDetails.style.display = 'none';
                            itemDetails.innerHTML = "";
                        }

                    })
                })
            }

        })
        // if input didn't match from api name
        .catch(() => {
            const mainDiv = document.getElementById('elementBox');
            console.log("did not matched");
            mainDiv.innerHTML =
                `
            <h2 id="display-none">Couldn't Find Anything</h2>
            `
        });
}