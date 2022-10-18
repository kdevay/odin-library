// Dom elements
const libraryContainer = document.getElementById('books'); // Books container
// New Book form
const addFormContainer = document.getElementById("addbook"); // Form container
addFormContainer.style.display = "none";
const addFormToggle = document.getElementById("reveal"); // +book icon
addFormToggle.addEventListener("click", () => addFormContainer.style.display = 'flex');
const addBook = document.getElementById("submit");
addBook.style.display = "block";

// Edit Book form
const popup = document.getElementById('popup-shadow'); // Popup container
popup.style.display = 'none'

const updateButton = document.getElementById('update_book')
const deleteButton = document.getElementById('delete_book')

const closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => popup.style.display = 'none'); // Close popup window


// library
let library = {
    books: [],
    bookCount: 0,
    addFormInputs() {
        let title = document.getElementById("title").textContent;
        let author = document.getElementById("author").textContent;
        let pages = document.getElementById("pages").textContent;
        let genre = document.getElementById("genre").textContent;
        let hasRead = document.getElementById('unread').checked ? false : true;
        let deleted = false;
        let index = library.bookCount;
        return {title, author, pages, genre, hasRead, deleted, index};
    },
    addBook(e) {
        e.preventDefault()
        let newBook = addFormInputs(); // Get form inputs 
        this.books.push(newBook);// Add book to array
        // Update Count
        this.bookCount++;
        // Add tile
        this.addTile(newBook)
    },
    editBook(e) {
        // Prevent form submission
        e.preventDefault()
    
        // Import inputs from edit form
        let titleI = document.getElementById('edit_title').value;
        let authorI = document.getElementById('edit_author').value;
        let pagesI = document.getElementById('edit_pages').value;
        let genreI = document.getElementById("edit_genre").value;
        let hasReadI = document.getElementById("edit_unread").checked ? false : true;
    
        // Get book index from button data_id
        let id = e.target.getAttribute('data_id');
    
        // Apply form changes to book
        this.books[id].title = titleI;
        this.books[id].author = authorI;
        this.books[id].pages = pagesI;
        this.books[id].genre = genreI;
        this.books[id].hasRead = hasReadI;

    
        // Apply form changes to tile
        let title = document.getElementById('tTitle' + id);
        title.textContent = 'Title: ' + title;
        let author = document.getElementById('tAuthor' + id);
        author.textContent = 'Author: ' + author;
        let pages = document.getElementById('tPages' + id);
        pages.textContent = 'Pages: ' + pages;
        let genre = document.getElementById('tGenre' + id);
        genre.textContent = 'Genre: ' + genre;
        let status = document.getElementById('tStatus' + id);
        status.textContent = 'Status: ' + statusText;
    
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
        this.books[id].deleted = true;
    
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
        title.value = this.books[index].title;
        let author = document.getElementById('edit_author');
        author.value = this.books[index].author;
        let pages = document.getElementById('edit_pages');
        pages.value = this.books[index].pages;
        let genre = document.getElementById('edit_' + library[index].genre);
        genre.setAttribute('checked', true);
    
        let status;
        if (this.books[index].hasRead === true) {
            status = document.getElementById('edit_read');
        } else {
            status = document.getElementById('edit_unread');
        }
        status.setAttribute('checked', true);
    
        // add tile id to update & delete buttons
        updateButton.setAttribute('data_id', index);
        deleteButton.setAttribute('data_id', index);
        // add event listeners to buttons
        updateButton.addEventListener('click', this.editBook);
        deleteButton.addEventListener('click', this.deleteBook);
    
        // Display popup
        popup.style.display = 'flex';
    },
    addTile(book) {
        // tile div
        let tile = document.createElement('div');
        tile.setAttribute('class', 'book');
        tile.setAttribute('id', 'tile' + book.index);

        // Data labels
        let tLabel = document.createElement('p');
        tLabel.textContent = 'Title: ';
        let aLabel = document.createElement('p');
        aLabel.textContent = 'Author: ';
        let gLabel = document.createElement('p');
        gLabel.textContent = 'Genre: ';
        let pLabel = document.createElement('p');
        pLabel.textContent = 'Pages: ';
        let sLabel = document.createElement('p');
        sLabel.textContent = 'Status: ';
        
        // Data elements
        let title = document.createElement('p');
        title.textContent = book.title;
        title.setAttribute('id', 'Title' + book.index);
        tile.appendChild(title)
        let author = document.createElement('p');
        author.textContent = book.author;
        author.setAttribute('id', 'Author' + book.index);
        tile.appendChild(author)
        let genre = document.createElement('p');
        genre.textContent = book.genre;
        genre.setAttribute('id', 'Genre' + book.index);
        tile.appendChild(genre)
        let pages = document.createElement('p');
        pages.textContent = book.pages;
        pages.setAttribute('id', 'Pages' + book.index);
        tile.appendChild(pages)

        // Status label
        let status = document.createElement('p');
        status.setAttribute('id', 'Status' + book.index;
        book.hasRead ? status.textContent = 'Read': status.textContent = 'Unread';
        tile.appendChild(status);

        // Edit button
        let editButton = document.createElement('button');
        editButton.setAttribute('data-id', + book.index)
        editButton.addEventListener('click', this.displayEditForm);
        editButton.textContent = 'edit';
        tile.appendChild(editButton);

        // Add tile to dom
        libraryContainer.appendChild(tile);
    }
};