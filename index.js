const books = document.querySelector('.books')
const input = document.querySelector('input')
const button = document.querySelector('button')
const result = document.getElementById('result')
const searchItem = document.getElementById('searchItem')
button.addEventListener('click', e => {
    e.preventDefault();
    books.innerHTML=''
    result.innerHTML=`
                <img src="https://cdn.dribbble.com/users/765253/screenshots/2540865/loader.gif" class="img-fluid mx-auto">
                `
    value = input.value.trim();
    console.log(value)
    if (value === '') {
        alert('Please Add Any Valid Book name')
        input.value=''
    } else {
        bookHandler(value)
        input.value=''
    }
})

bookHandler=keyword=>{
    fetch(`https://openlibrary.org/search.json?q=${keyword}`)
        .then(res => res.json())
        .then(data => {
            books.innerHTML = ''
            if (data.numFound === 0) {
                alert('Please Add Any Valid Book name')
                result.innerHTML=''
            } else {
                data.docs.forEach((item, idx) => {
                    newBook(item)
                    resultCount(data, idx + 1)
                })
            }
        })
}

resultCount = (data, count) => {
    result.innerHTML = `<h6 class="text-uppercase">Showing ${count} Results For "${data.q}"</h6>`
}

newBook = item => {
    let singleBook = document.createElement('div')
    singleBook.classList.add('col')
    let bookInner = document.createElement('div')
    bookInner.classList.add('shadow-sm', 'border', 'p-2', 'rounded')
    let bookSrc = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
    if (item.cover_i === undefined) {
        bookSrc = 'https://cdn.pixabay.com/photo/2013/07/13/13/34/book-161117_1280.png'
    }
    bookInner.innerHTML = `
    <img src=${bookSrc} class="rounded w-100" />
    <h5 class="text-center mt-1">${item.title}</h5>
    <h6 class="text-center bg-danger text-white w-auto py-2">By ${item.author_name}</h6>
    <p class="text-center">Published By ${item.publisher} in ${item.first_publish_year} </P>
    `
    singleBook.appendChild(bookInner)
    books.appendChild(singleBook)
}
