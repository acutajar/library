const btnAddBook = document.getElementById('add-book');
const popup = document.getElementById('popup');
const bookContainer = document.querySelector('.book-container')
const form = document.getElementById('form');
const readCheckboxes = document.getElementsByName('read');
const btnRemove = document.getElementsByName('delete');
let myLibrary = [];


btnAddBook.addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block'
});


function addBook() {
    const newTitle = document.getElementById('title').value;
    const newAuthor = document.getElementById('author').value;
    const newPages = document.getElementById('pages').value;
    const newRead = document.getElementById('read').checked;
    
    let myBook = new Book(newTitle, newAuthor, newPages, newRead);
    addBookToLibrary(myBook);
    closeForm();
    createBookCards();
    readCheckboxes.forEach(function(a) {
        a.addEventListener('change', readCbxChange);
    });

}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


function createBookCards() {
    resetCards();
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('div');
        const bookAuthor = document.createElement('div');
        const bookPages = document.createElement('div');
        const cbxRead = document.createElement('input');
        const btnDelete = document.createElement('button');
        const lblRead = document.createElement('label');
    
        bookCard.setAttribute('class', 'book-card');
        bookTitle.setAttribute('class', 'title');
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages + " pages";
        cbxRead.checked = book.read;
        btnDelete.setAttribute('id', index);
        btnDelete.setAttribute('name', 'delete');
        btnDelete.textContent = "Remove";
        cbxRead.setAttribute('type', 'checkbox');
        cbxRead.setAttribute('name', 'read');
        cbxRead.setAttribute('id', index);
        cbxRead.setAttribute('class', 'checkbox');
        cbxRead.setAttribute('style', 'vertical-align:middle')
        lblRead.textContent= 'Read? ';
        
        bookContainer.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        lblRead.appendChild(cbxRead);
        bookCard.appendChild(lblRead);
        bookCard.appendChild(btnDelete);
    });
    btnRemove.forEach(function(a) {
        a.addEventListener('click', removeBook);
    })
}

createBookCards();

function resetCards() {
    bookContainer.innerHTML = ""
}

function closeForm() {
   document.getElementById('form').reset(); 
   document.getElementById('popup').style.display = 'none'
}

readCheckboxes.forEach(function(a) {
    a.addEventListener('change', readCbxChange);
});


function readCbxChange(e) {
    myLibrary[e.target.id].read = !myLibrary[e.target.id].read;
    console.log(myLibrary[e.target.id])
}



function removeBook(e) {
    myLibrary.splice(e.target.id, 1);
    createBookCards();
    console.log(myLibrary);
}
