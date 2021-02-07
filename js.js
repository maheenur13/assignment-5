document.getElementById('btn').addEventListener('click', () => {
    const getFoodName = document.getElementById('getInput');
    // const foodName = getFoodName.toUpperCase();
    const mainDiv = document.getElementById('elementBox');
    mainDiv.innerHTML="";
    findData(getFoodName.value);
    getFoodName.value="";
    

})
const findData = (names) => {
    const updateName=names.toUpperCase();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${updateName}`)
        .then(response => response.json())
        .then(data => {
            const mainDiv = document.getElementById('elementBox');
            const errorMessage = document.getElementById('showNone');
            const AllMeals = data.meals;  
            if(updateName==""){
                mainDiv.style.display='none';
                errorMessage.style.display='block';
            }       
            else{

                mainDiv.style.display='flex';
                errorMessage.style.display='none';
            const AllItems = AllMeals.map(item => {    
                // const defaultItem = item.strMeal;
                // const prevItem= names.toUpperCase(); 
                // const newItem = defaultItem.toUpperCase();
                // const print =newItem.match(prevItem);
                // // console.log(`okay`,print,'Mahee');
                    errorMessage.style.display = 'none';
                    mainDiv.style.display = 'flex';
                    // console.log(item);
                    const imageLink = item.strMealThumb;
                    const newDiv = document.createElement('div');
                    newDiv.className = 'newDiv'
                    const newDivInfo =
                        `
                     <div id="image-div"><img class="image-design" src="${imageLink}" alr=""></div>
                       <p> ${item.strMeal}</p>
                           `
                    newDiv.innerHTML = newDivInfo;
                    mainDiv.appendChild(newDiv);
            })
        }
            
        })
}