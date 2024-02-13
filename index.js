
alert("Welcome to Avisoft Library");

library=[];
window.onload = function() {
    const storedLibrary = localStorage.getItem('library');
    if (storedLibrary) {
        library = JSON.parse(storedLibrary);
        displayBooks();
    }
};

function addBook() {
    let bookId = document.getElementById('book-id').value;
    let bookTitle = document.getElementById('book-title').value;
    let authorName = document.getElementById('author-name').value;

    if (bookId && bookTitle && authorName) {
        let newBook = {
            id: bookId,
            title: bookTitle,
            author: authorName,
            isBorrowed: false
        };
        library.push(newBook);
        localStorage.setItem('library', JSON.stringify(library));

        displayBooks();
    } else {
        alert('Please fill in all fields.');
    }
}

alert("Get through all the books");

function displayBooks() {
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    library.forEach(book => {
        let listItem = document.createElement('li');
        listItem.classList.add('book-item');
        listItem.innerHTML = `${book.id} - ${book.title} by ${book.author} `;
        let borrowButton = document.createElement('button');
        borrowButton.textContent = book.isBorrowed ? 'Return' : 'Borrow';
        borrowButton.onclick = function() {
            toggleBorrowStatus(book);
        };
        listItem.appendChild(borrowButton);
        bookList.appendChild(listItem);
    });
}

function toggleBorrowStatus(book) {
    if (book.isBorrowed) {
        book.isBorrowed = false;
        localStorage.setItem('library', JSON.stringify(library));
        displayBooks();
        alert('Book returned successfully');
    } else {
        book.isBorrowed = true;
        localStorage.setItem('library', JSON.stringify(library));
        displayBooks();
        alert('Book borrowed successfully');
    }
}


function searchBook() {
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    let searchResults = library.filter(book => book.title.toLowerCase().includes(searchTerm));
    displaySearchResults(searchResults);
}

function displaySearchResults(results) {
    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    if (results.length === 0) {
        let listItem = document.createElement('li');
        listItem.textContent = 'No matching books found.';
        bookList.appendChild(listItem);
    } else {
        results.forEach(book => {
            let listItem = document.createElement('li');
            listItem.textContent = `${book.id} - ${book.title} by ${book.author}`;
            bookList.appendChild(listItem);
        });
    }
}
