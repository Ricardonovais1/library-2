const newBook = document.querySelector('.new-btn');
const modalWrapper = document.querySelector('.wrapper');
const closeModal = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const saveBook = document.getElementById('save-book');
const cardsContainer = document.querySelector('.cards');


let bookShelf = []

// Open modal
newBook.addEventListener('click', () => {
    modalWrapper.classList.remove('hide');
    bookTitle.focus()
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
}); 

// Close modal
modalWrapper.addEventListener('click', (e) => {
    const classesThatClosePopup = ['wrapper', 'modal-close'];
    const clickedElement = e.target.classList[0]
    let shouldClose = classesThatClosePopup.includes(clickedElement)
    if (shouldClose) modalWrapper.classList.add('hide')
});

class Book {
    constructor (name, author, pages, read) {
        this.name = name,
        this.author = author,
        this.pages = pages,
        this.read = read
    }
}

saveBook.addEventListener('click', ()=> {
    let customBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, false)
   
    bookShelf.push({
        Title: customBook.name,
        Author: customBook.author,
        Pages: customBook.pages,
        Read: false
    })

    // Salvar no localSatorage:
    const bookShelfJSON = JSON.stringify(bookShelf)
    localStorage.setItem('bookShelf', bookShelfJSON)

    createBookCard(bookShelf[bookShelf.length - 1], bookShelf.length + 1);

    modalWrapper.classList.add('hide')
})

const createBookCard = (bookObj, index) => {

    let bookkeys = Object.keys(bookObj);

    // Create book Card
    const bookCard = document.createElement('div');
    bookCard.className = "card";
    bookCard.setAttribute("data-index", index);
    cardsContainer.appendChild(bookCard)

    // Create info area
    const infoArea = document.createElement('div');
    infoArea.className = 'info';
    bookCard.appendChild(infoArea)

    // Create Spans
    const bName = document.createElement('span');
    bName.className = 'b-name';
    infoArea.appendChild(bName);

    const bAuthor = document.createElement('span');
    bAuthor.className = 'b-author';
    infoArea.appendChild(bAuthor);

    const bPages = document.createElement('span');
    bPages.className = 'b-pages';
    infoArea.appendChild(bPages);

    const bRead = document.createElement('span');
    bRead.className = 'b-read';
    infoArea.appendChild(bRead)

    // Create Labels
    const labelTitle = document.createElement('h3');
    labelTitle.textContent = `${bookkeys[0]}: `;
    bName.appendChild(labelTitle);

    const labelAuthor = document.createElement('h3');
    labelAuthor.textContent = `${bookkeys[1]}: `;
    bAuthor.appendChild(labelAuthor);

    const labelPages = document.createElement('h3');
    labelPages.textContent = `${bookkeys[2]}: `;
    bPages.appendChild(labelPages);

    const labelRead = document.createElement('h3');
    labelRead.textContent = `${bookkeys[3]}: `;
    bRead.appendChild(labelRead);

    // Create Dynamic content
    const contentTitle = document.createElement('p');
    contentTitle.textContent = bookObj.Title;
    bName.appendChild(contentTitle);

    const contentAuthor = document.createElement('p');
    contentAuthor.textContent = bookObj.Author;
    bAuthor.appendChild(contentAuthor);

    const contentPages = document.createElement('p');
    contentPages.textContent = bookObj.Pages;
    bPages.appendChild(contentPages);

    const contentRead = document.createElement('input');
    contentRead.type = "checkbox";
    contentRead.checked = false;
    contentRead.textContent = bookObj.bookRead;
    bRead.appendChild(contentRead);

    const trashIcon = document.createElement('img');
    trashIcon.className = "trash-icon";
    trashIcon.src = "./img/trask-icon.png";
    bookCard.appendChild(trashIcon)

    trashIcon.addEventListener('click', (e) => {
        const index = e.target.closest('.card').getAttribute('data-index');

        bookShelf.splice(index, 1);
        cardsContainer.removeChild(bookCard);
        // Salvar no localSatorage:
        const bookShelfJSON = JSON.stringify(bookShelf)
        localStorage.setItem('bookShelf', bookShelfJSON)   
    })
} 

const bookShelfJSON = localStorage.getItem('bookShelf');
const bookShelfSave = JSON.parse(bookShelfJSON) ;

bookShelfSave.forEach((book, index) => {
    createBookCard(book, index);
})

console.log(bookShelf)



