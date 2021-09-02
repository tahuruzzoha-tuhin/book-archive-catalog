

/*****************************\
       GRAB THE ELEMENTS
\*****************************/
const bookContainer = document.getElementById('book-container')
const result = document.getElementById('result')
const searchText = document.getElementById('search-text');


/***********************************\
    SEARCH BUTTON HANDLER SPINNER
\***********************************/
document.getElementById('search-btn').addEventListener('click', () => {
    bookContainer.innerHTML = `
    <div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <div class="spinner-border text-success" role="status">
         <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;



    /************************************\
        ERROR HANDLING FOR BLANK INPUT
    \************************************/
    if (searchText.value == '') {
        bookContainer.innerHTML = '';
        result.innerHTML = "Please search with a valid book name!";
        result.style.background = '#1e272d';
    } else {
        const api = `https://openlibrary.org/search.json?q=${searchText.value}`;
 

        searchText.value = '';
        result.innerHTML = '';
        result.style.background = 'transparent';
        fetch(api)
            .then(res => res.json())
            .then(data => showData(data));
    }
});


const showData = (books) => {

    /*************************\
        FILTER THE DATA
    \*************************/
    const booksBox = books.docs.filter(element => element.cover_i !== undefined && element.author_name !== undefined && element.publisher !== undefined && element.title !== undefined && element.first_publish_year !== undefined);


    /*********************************\
        VALIDATION FOR WRONG INPUT
    \*********************************/
    if (booksBox.length === 0) {
        result.innerHTML = '';
        result.innerHTML = 'No Result Found!';
        result.style.background = '#1e272d';
        bookContainer.innerHTML = '';
    } else {
        const totalResult = books.numFound;
        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = `Total Search Result <b class="text-white">${totalResult}</b> books showing <b class='text-white'>${booksBox.length}</b> books`;
        result.style.background = '#1e272d';
        result.innerHTML = '';
        result.appendChild(newParagraph);
        bookContainer.innerHTML = '';
        booksBox.forEach(book => {
            const newDiv = document.createElement('div');


    /*********************************\
        DYNAMIC HTML FOR BOOKS CARD
    \*********************************/
            newDiv.innerHTML = `
            <div class="card-group ">
                <div class="card shadow mb-5" style="width: 15rem;min-height:450px">
                    <img class="card-img-top img-fluid" style="width:100%; height:250px" src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'>
                    <div class="card-body">
                        <h5 class="card-title title ">${book.title}</h5>
                        <p class="card-subtitle author">Author: <span class="span">${book.author_name[0]}</span></p>
                        <p class="card-text publisher">Publisher: <span class="span">${book.publisher[0]}</span></p>
                        <p class="card-text publish-year">First Publish Year: <span class="span">${book.first_publish_year}</span></p>
                    </div>
                </div>
            </div>`;
            bookContainer.appendChild(newDiv);
        })
    }
}