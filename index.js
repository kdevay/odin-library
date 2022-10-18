// Books container
const libraryContainer = document.getElementById('books'); 

// New Book form container
const addFormContainer = document.getElementById("addbook");
addFormContainer.style.display = "none";
// New Book form buttons
const addFormToggle = document.getElementById("reveal"); // +book icon
const addBook = document.getElementById("submit");

// Edit Book form container
const popup = document.getElementById('popup-shadow'); // Popup container
popup.style.display = 'none'
// Edit Book form buttons
const updateButton = document.getElementById('update_book')
const deleteButton = document.getElementById('delete_book')
const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => popup.style.display = 'none'); // Close popup window


class Book {
    constructor() {
        this.title = document.getElementById("title").value;
        this.author = document.getElementById("author").value;
        this.pages = document.getElementById("pages").value;
        this.genre = document.getElementById("genre").value;
        this.hasRead = document.getElementById('unread').checked ? false : true;
        this.deleted = false;
        this.index = library.bookCount;
    }
};

// library
let library = {
    books: [],
    bookCount: 0,
    displayNewForm() {
        // Display form and hide add book icon
        addFormContainer.style.display = 'flex';
        addFormToggle.style.display = "none"; 
    },
    addBook(e) {
        e.preventDefault()
        let newBook = new Book(); // Get form inputs 
        library.books.push(newBook); // Add book to array
        // Update Count
        library.bookCount++;
        // Add tile
        library.addTile(newBook)
        addFormToggle.style.display = "block"; 
    },
    editBook(e) {
        // Prevent form submission
        e.preventDefault()
    
        // Get book index from button data_id
        let id = e.target.getAttribute('data_id');
        
        // Apply form changes to book
        library.books[id].title = document.getElementById('edit_title').value;
        library.books[id].author = document.getElementById('edit_author').value;
        library.books[id].pages = document.getElementById('edit_pages').value;
        library.books[id].genre = document.getElementById("edit_genre").value;
        library.books[id].hasRead = document.getElementById("edit_read").checked ? true : false;

        // Apply form changes to tile
        let title = document.getElementById('Title' + id);
        title.textContent = library.books[id].title;
        let author = document.getElementById('Author' + id);
        author.textContent = library.books[id].author;
        let pages = document.getElementById('Pages' + id);
        pages.textContent = library.books[id].pages;
        let genre = document.getElementById('Genre' + id);
        genre.textContent = library.books[id].genre;
        let status = document.getElementById('Status' + id);
        library.books[id].hasRead === false ? status.textContent = 'Unread' : status.textContent = 'Read';


        // Hide popup
        popup.style.display = 'none'
    },
    deleteBook(e) {
        // Prevent form submission
        e.preventDefault()
    
        // Hide popup
        popup.style.display = 'none'
    
        // Get book index from delete button's data_id
        let id = e.target.getAttribute('data_id');
    
        // 'Delete' book object from library
        library.books[id].deleted = true;
    
        // Delete book tile from html
        let tile = document.getElementById('tile' + id);
        tile.remove()
    },
    // Display edit form
    displayEditForm(e) {
        // Get tile id from event target
        let index = e.target.getAttribute('data-id');
    
        // Fill form inputs from library dict
        let title = document.getElementById('edit_title');
        title.value = library.books[index].title;
        let author = document.getElementById('edit_author');
        author.value = library.books[index].author;
        let pages = document.getElementById('edit_pages');
        pages.value = library.books[index].pages;
        let genre = document.getElementById('edit_' + library.books[index].genre);
        genre.setAttribute('checked', true);
    
        let status; // Check read/unread depending on hasRead value
        library.books[index].hasRead === true ? status = document.getElementById('edit_read'): status = document.getElementById('edit_unread');
        status.setAttribute('checked', true);
    
        // add tile id to update & delete buttons
        updateButton.setAttribute('data_id', index);
        deleteButton.setAttribute('data_id', index);
        // add event listeners to buttons
        updateButton.addEventListener('click', library.editBook);
        deleteButton.addEventListener('click', library.deleteBook);
    
        // Display popup
        popup.style.display = 'flex';
    },
    addTile(book) {
        // Hide form
        addFormContainer.style.display = "none";

        // Tile div
        let tile = document.createElement('div');
        tile.setAttribute('class', 'book');
        tile.setAttribute('id', 'tile' + book.index);

        // Data labels
        let labels = document.createElement('div');
        labels.setAttribute('class', 'tileColumn');
        tile.appendChild(labels);
        let tLabel = document.createElement('p');
        tLabel.textContent = 'Title: ';
        labels.appendChild(tLabel)
        let aLabel = document.createElement('p');
        aLabel.textContent = 'Author: ';
        labels.appendChild(aLabel)
        let gLabel = document.createElement('p');
        gLabel.textContent = 'Genre: ';
        labels.appendChild(gLabel)
        let pLabel = document.createElement('p');
        pLabel.textContent = 'Pages: ';
        labels.appendChild(pLabel)
        let sLabel = document.createElement('p');
        sLabel.textContent = 'Status: ';
        labels.appendChild(sLabel)
        
        // Data elements
        let data = document.createElement('div');
        data.setAttribute('class', 'tileColumn');
        tile.appendChild(data);
        let title = document.createElement('p');
        title.textContent = book.title;
        title.setAttribute('id', 'Title' + book.index);
        data.appendChild(title)
        let author = document.createElement('p');
        author.textContent = book.author;
        author.setAttribute('id', 'Author' + book.index);
        data.appendChild(author)
        let genre = document.createElement('p');
        genre.textContent = book.genre;
        genre.setAttribute('id', 'Genre' + book.index);
        data.appendChild(genre)
        let pages = document.createElement('p');
        pages.textContent = book.pages;
        pages.setAttribute('id', 'Pages' + book.index);
        data.appendChild(pages)

        // Status
        let status = document.createElement('p');
        status.setAttribute('id', 'Status' + book.index);
        book.hasRead ? status.textContent = 'Read': status.textContent = 'Unread';
        data.appendChild(status);

        // Edit button
        let editBDiv = document.createElement('div');
        editBDiv.setAttribute('class', 'editButton')
        tile.appendChild(editBDiv);
        let editButton = document.createElement('button');
        editButton.setAttribute('data-id', + book.index)
        editButton.addEventListener('click', library.displayEditForm);
        editButton.textContent = 'edit';
        editBDiv.appendChild(editButton);

        // Add tile to dom
        libraryContainer.appendChild(tile);
    }
};

// New Book form button event listeners
addFormToggle.addEventListener("click", library.displayNewForm);
addBook.addEventListener("click", library.addBook);