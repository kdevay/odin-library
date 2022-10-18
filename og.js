// library
let library = [];
function Book() {
    this.title = "";
    this.author = "";
    this.pages = 0;
    this.genre = "";
    this.hasRead = "";
    this.deleted = false;
};
let bookCounter = 0;

// Import dom elements
const addButton = document.getElementById("reveal");
const newBookFormContainer = document.getElementById("addbook");
const addBookButton = document.getElementById("submit");
const libraryContainer = document.getElementById('books');

// Import form inputs 
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputGenre = document.getElementById("genre");

// Import Popup
const popup = document.getElementById('popup-shadow');
popup.style.display = 'none'
const updateButton = document.getElementById('update_book')
updateButton.addEventListener('click', updateBook);
const deleteButton = document.getElementById('delete_book')
deleteButton.addEventListener('click', deleteBook);
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => popup.style.display = 'none'); // Close popup window


// Delete book tile
function deleteBook(e) {
    // Prevent form submission
    e.preventDefault()

    // Hide popup
    popup.style.display = 'none'

    // Get book index from delete button's data_id
    let id = e.target.getAttribute('data_id');

    // 'Delete' book object from library
    library[id].deleted = true;

    // Delete book tile from html
    let tile = document.getElementById('tile' + id);
    tile.remove()
}


// Update book tile
function updateBook(e) {
    // Prevent form submission
    e.preventDefault()

    // Import inputs from edit form
    let ftitle = document.getElementById('edit_title').value;
    let fauthor = document.getElementById('edit_author').value;
    let fpages = document.getElementById('edit_pages').value;
    let fgenre = document.getElementById("edit_genre").value;
    let fread = document.getElementById("edit_read").checked;
    let funread = document.getElementById("edit_unread").checked;

    // Get book index from button data_id
    let id = e.target.getAttribute('data_id');

    // Apply form changes to book
    library[id].title = ftitle;
    library[id].author = fauthor;
    library[id].pages = fpages;
    library[id].genre = fgenre;

    // check read status
    let statusText;
    if (fread) {
        library[id].hasRead = true;
        statusText = 'Read';
    } else {
        library[id].hasRead = false;
        statusText = 'Unread';
    }

    // Apply form changes to tile
    let title = document.getElementById('tTitle' + id);
    title.textContent = 'Title: ' + ftitle;
    let author = document.getElementById('tAuthor' + id);
    author.textContent = 'Author: ' + fauthor;
    let pages = document.getElementById('tPages' + id);
    pages.textContent = 'Pages: ' + fpages;
    let genre = document.getElementById('tGenre' + id);
    genre.textContent = 'Genre: ' + fgenre;
    let status = document.getElementById('tStatus' + id);
    status.textContent = 'Status: ' + statusText;

    // Hide popup
    popup.style.display = 'none'
}


// Display edit popup
function editBook(e) {
    // Get tile id from event target
    let tileId = e.target.getAttribute('data-id');

    // Fill form inputs from library dict
    let title = document.getElementById('edit_title');
    title.value = library[tileId].title;
    let author = document.getElementById('edit_author');
    author.value = library[tileId].author;
    let pages = document.getElementById('edit_pages');
    pages.value = library[tileId].pages;
    let genre = document.getElementById('edit_' + library[tileId].genre);
    genre.setAttribute('checked', true);

    let status;
    if (library[tileId].hasRead === true) {
        status = document.getElementById('edit_read');
    } else {
        status = document.getElementById('edit_unread');
    }
    status.setAttribute('checked', true);

    // add tile id to update & delete buttons
    updateButton.setAttribute('data_id', tileId);
    deleteButton.setAttribute('data_id', tileId);

    // Display popup
    popup.style.display = 'flex';
}


// Dynamically create book tiles
function createBookTile (counter) {
    // tile div
    let tile = document.createElement('div');
    tile.setAttribute('class', 'book');
    tile.setAttribute('id', 'tile' + counter);

    // paragraph elements
    let tTitle = document.createElement('p');
    tTitle.textContent = 'Title: ' + library[counter].title;
    tTitle.setAttribute('id', 'tTitle' + counter);
    tile.appendChild(tTitle)
    let tAuthor = document.createElement('p');
    tAuthor.textContent = 'Author: ' + library[counter].author;
    tAuthor.setAttribute('id', 'tAuthor' + counter);
    tile.appendChild(tAuthor)
    let tGenre = document.createElement('p');
    tGenre.textContent = 'Genre: ' + library[counter].genre;
    tGenre.setAttribute('id', 'tGenre' + counter);
    tile.appendChild(tGenre)
    let tPages = document.createElement('p');
    tPages.textContent = 'Pages: ' + library[counter].pages;
    tPages.setAttribute('id', 'tPages' + counter);
    tile.appendChild(tPages)

    // Status label
    let tStatus = document.createElement('p');
    tStatus.setAttribute('id', 'tStatus' + counter);
    if (library[counter].hasRead ) {
        tStatus.textContent = 'Status: Read';
    } else {
        tStatus.textContent = 'Status: Unread';
    }
    tile.appendChild(tStatus);

    // Edit button
    let editButton = document.createElement('button');
    editButton.setAttribute('data-id', + counter)
    editButton.addEventListener('click', editBook);
    editButton.textContent = 'edit';
    tile.appendChild(editButton)

    // Add tile to dom
    libraryContainer.appendChild(tile);
}


// New Book Button
newBookButton.addEventListener("click", hideReveal)
function hideReveal () {
    // Hide new book button
    newBookButton.style.display = "none";
    // Reveal book form
    newBookFormContainer.style.display = "flex";
}

// Add book button
addBookButton.addEventListener("click", importBook)
function importBook (e) {
    e.preventDefault()
    
    let newBook = new Book;
    newBook.title = inputTitle.value;
    newBook.author = inputAuthor.value;
    newBook.pages = inputPages.value;
    newBook.genre = inputGenre.value;
    // check read status
    if (document.getElementById('unread').checked) {
        newBook.hasRead = false;
    } else {
        newBook.hasRead = true;
    }

    // Hide form container
    newBookFormContainer.style.display = "none";
    // Reveal new book button
    newBookButton.style.display = "block";

    // Add new book to library
    library.push(newBook);
    createBookTile(bookCounter);
    bookCounter++;
}




