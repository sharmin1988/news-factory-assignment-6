
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.data.news_category)
    return data.data.news_category
}

const displayCategoryData = async (categories) => {
    const categoriesData = await loadData(categories)
    console.log(categoriesData)
    const categoriesContainer = document.getElementById('categories-container')
    categoriesData.forEach(category => {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <button class="btn btn-outline-light"><a class="text-decoration-none text-success fw-semibold" href="">${category.category_name}</a></button>
        `;
        categoriesContainer.appendChild(categoryDiv)
    });
};


displayCategoryData()