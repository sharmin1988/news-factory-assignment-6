
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.data.news_category)
    return data.data.news_category
}

const displayCategorories = async (categories) => {
    const categoriesData = await loadData(categories)
    // console.log(categoriesData)

    const categoriesContainer = document.getElementById('categories-container')
    categoriesData.forEach(category => {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <button onclick = "loadCategoryData('${category.category_id}')" class="btn btn-outline-light"><a  class="text-decoration-none text-success fw-semibold" href="#all-news-container">${category.category_name}</a></button>
        
        `;
        categoriesContainer.appendChild(categoryDiv)
    });
};

const loadCategoryData = async (categoryId) => {
    // console.log(categoryId , 'hh')
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url)
    const data = await res.json()
    displayCategoryData(data.data)
}

const displayCategoryData = allNews => {
   
    // footer add
    const footer = document.getElementById('footer')
    footer.innerHTML = `<div class="text-center text-white-50 bg-black p-5">
    <h6>Copyright 2021 News Factory</h6>
</div>`
    const allNewsContainer = document.getElementById('all-news-container')
    allNewsContainer.textContent = '';
    allNews.forEach(news => {
        const { title, details, author, image_url } = news
        const newsDiv = document.createElement('div')
        newsDiv.classList.add('col')
        newsDiv.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">Details : ${details.length > 200 ? details.slice(0, 200) + '...' : details} </p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
        `;
        allNewsContainer.appendChild(newsDiv)
    });
}

displayCategorories()
