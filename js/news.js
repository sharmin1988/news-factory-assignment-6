
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url)
        const data = await res.json()
        // console.log(data.data.news_category)
        return data.data.news_category
    }
    catch (error) {
        console.log(error)
    }
}

// ------ display All categories ------
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



// ----- category data load & display Details Start ------------
const loadCategoryData = async (categoryId) => {
    
    //  call spinner
    toggleSpinner(true)

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayCategoryData(data.data);
    }
    catch (error) {
        console.log(error)
    }

}
const displayCategoryData = allNews => {
    const allNewsContainer = document.getElementById('all-news-container');
    // Clean blog content 
    const blogContainer = document.getElementById('blog-container')
    blogContainer.classList.add('d-none')
    const itemsFound = document.getElementById('items-found')
    itemsFound.classList.remove('d-none')

    // how many items found / not founnd
    const noData = document.getElementById('no-data');
    const dataFound = document.getElementById('data-found')
    // footer 
    const footer = document.getElementById('footer')

    // check category empty or not 
    if (allNews.length === 0) {
        noData.classList.remove('d-none')
        dataFound.classList.add('d-none')
        allNewsContainer.textContent = '';
        footer.classList.add('d-none')
    }
    else {
        noData.classList.add('d-none')
        dataFound.classList.remove('d-none')
        dataFound.innerText = `${allNews.length} items found, please check below....`
        allNewsContainer.textContent = '';

        footer.innerHTML = `<div class="text-center text-white-50 bg-black p-5">
                                <h6>Copyright 2021 News Factory</h6>
                            </div>`;
        footer.classList.remove('d-none')

        // loop to get singel news
        allNews.forEach(news => {
            const { title, details, author, image_url, total_view, _id } = news
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

                        <div class="d-flex justify-content-around align-items-center">
                        <div class="d-flex justify-content-between align-items-center gap-2">
                            
                            <img src="${author.img ? author.img : 'Not available'}" style="width: 40px; height: 40px;" class="rounded-circle img-fluid "  alt="">
                            
                            <div>
                                <p class ="m-0  fw-semibold " >${author.name ? author.name : 'Not Available !!!'}</p>
                                <p class ="m-0 text-muted fw-semibold">${author.published_date}</p>
                            </div>
                        </div>
                        <div class="">
                            <img src="image/carbon_view.png"  class="img-fluid" alt="">
                            <span class="fw-bold ms-1">${total_view ? total_view : 'N/A'}</span>
                        </div>
                        <div onclick = "loadNewsDetails('${_id}')" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#newsModal">
                            <img src="image/Group.png" alt="">
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
        `;
            allNewsContainer.appendChild(newsDiv)
        });
    }
    //  stop spinner
    toggleSpinner(false)
}



//-------- Modal data load & display -----
const loadNewsDetails = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayModalNewsDetails(data.data[0])
    }
    catch (error) {
        console.log(error)
    }
}
const displayModalNewsDetails = modalNews => {

    // destructuring
    const { image_url, author, rating, others_info, title } = modalNews

    const modalContainer = document.getElementById('modal-container')
    modalContainer.textContent = '';

    const modalDiv = document.createElement('div')
    modalDiv.classList.add('modal-content')
    modalDiv.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="newsModalLabel">More info..</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <img src="${image_url}" class="img-fluid mb-2" alt="">
        <h4>${title}</h4>
        <h6 class="mt-3">Rating: <span class = "text-danger">${rating ? rating.number : 'no-ratings'}</span> ${rating.badge}</h6>
        <p class=" fw-semibold">Others info : ${others_info.is_trending ? 'Trending' : 'Not_trending'}</p>
        <p class="my-0"><small>Author name : ${author.name ? author.name : 'N/A'}</small></p>
        <p class="my-0"><small>Published date : ${author.published_date}</small></p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
`;
    modalContainer.appendChild(modalDiv)
}

//----- spinner loding -------
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

// Load blogs items 
const loadBlogs = () => {
    const blogContainer = document.getElementById('blog-container')
    blogContainer.classList.remove('d-none')

    const allNewsContainer = document.getElementById('all-news-container')
    allNewsContainer.textContent= ''
    const itemsFound = document.getElementById('items-found')
    itemsFound.classList.add('d-none')

}

displayCategorories()
