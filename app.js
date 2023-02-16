const newBook = document.querySelector(".new-btn");
const editModalWrapper = document.querySelector(".edit-wrapper");
const editCloseModal = document.querySelector(".edit-modal-close");
const editModal = document.querySelector(".edit-modal");
const editBookTitle = document.getElementById("edit-book-title");
const editBookAuthor = document.getElementById("edit-book-author");
const editBookPages = document.getElementById("edit-book-pages");
const editModalClose = document.querySelector(".edit-modal-close");
const editSaveBook = document.getElementById("edit-save-book");



const modalWrapper = document.querySelector(".wrapper");
const closeModal = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const saveBook = document.getElementById("save-book");
const cardsContainer = document.querySelector(".cards");
const checkbox = document.querySelector(".read-or-not");

const bookShelfJSON = localStorage.getItem("bookShelf");
let bookShelf;

if (bookShelfJSON === null) {
  bookShelf = [];
} else {
  bookShelf = JSON.parse(bookShelfJSON);
}



// Open modal
newBook.addEventListener("click", () => {
  modalWrapper.classList.remove("hide");
  bookTitle.focus();
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
});

// Close modal
modalWrapper.addEventListener("click", (e) => {
  const classesThatClosePopup = ["wrapper", "modal-close"];
  const clickedElement = e.target.classList[0];
  let shouldClose = classesThatClosePopup.includes(clickedElement);
  if (shouldClose) modalWrapper.classList.add("hide");
});

class Book {
  constructor(id, name, author, pages, read) {
    this.id = id,
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read;
  }
}

saveBook.addEventListener("click", () => {
  let customBook = new Book(
    Date.now(),
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    false
  );

  bookShelf.push({
    id: customBook.id,
    Nome: customBook.name,
    Autor: customBook.author,
    Páginas: customBook.pages,
    Lido: false,
  });

  console.log(bookShelf);

  // Salvar no localSatorage:
  const bookShelfJSON = JSON.stringify(bookShelf);
  localStorage.setItem("bookShelf", bookShelfJSON);

  console.log(bookShelfJSON);
  console.log(bookShelf);

  createBookCard(bookShelf[bookShelf.length - 1], bookShelf.length + 1);

  modalWrapper.classList.add("hide");
});

const createBookCard = (bookObj, index) => {
  let bookId = bookObj.id
  let bookkeys = Object.keys(bookObj);
  

  // Create book Card
  const bookCard = document.createElement("div");
  bookCard.className = "card";
  bookCard.setAttribute("book-id", bookId);
  bookCard.setAttribute("data-index", index);
  cardsContainer.appendChild(bookCard);

  // Create info area
  const infoArea = document.createElement("div");
  infoArea.className = "info";
  bookCard.appendChild(infoArea);

  // Create Spans
  const bName = document.createElement("span");
  bName.className = "b-name";
  infoArea.appendChild(bName);

  const bAuthor = document.createElement("span");
  bAuthor.className = "b-author";
  infoArea.appendChild(bAuthor);

  const bPages = document.createElement("span");
  bPages.className = "b-pages";
  infoArea.appendChild(bPages);

  const bRead = document.createElement("span");
  bRead.className = "b-read";
  infoArea.appendChild(bRead);

  // Create Labels
  const labelTitle = document.createElement("h3");
  labelTitle.textContent = `${bookkeys[1]}: `;
  bName.appendChild(labelTitle);

  const labelAuthor = document.createElement("h3");
  labelAuthor.textContent = `${bookkeys[2]}: `;
  bAuthor.appendChild(labelAuthor);

  const labelPages = document.createElement("h3");
  labelPages.textContent = `${bookkeys[3]}: `;
  bPages.appendChild(labelPages);

  const labelRead = document.createElement("h3");
  labelRead.textContent = `${bookkeys[4]}: `;
  bRead.appendChild(labelRead);

  // Create Dynamic content
  const contentTitle = document.createElement("p");
  contentTitle.className = "content-title";
  contentTitle.textContent = bookObj.Nome;
  bName.appendChild(contentTitle);

  const contentAuthor = document.createElement("p");
  contentAuthor.className = "content-author";
  contentAuthor.textContent = bookObj.Autor;
  bAuthor.appendChild(contentAuthor);

  const contentPages = document.createElement("p");
  contentPages.className = 'content-pages';
  contentPages.textContent = bookObj.Páginas;
  bPages.appendChild(contentPages);

  const contentRead = document.createElement("input");
  contentRead.className = "read-or-not";
  contentRead.checked = bookObj.Read;
  contentRead.addEventListener("click", () => {
    bookObj.Read = !bookObj.Read;

    // Salvar Checked no localStorage:
    const bookShelfJSON = JSON.stringify(bookShelf);
    localStorage.setItem("bookShelf", bookShelfJSON);
  });

  contentRead.type = "checkbox";
  contentRead.textContent = bookObj.bookRead;
  bRead.appendChild(contentRead);

  const iconsArea = document.createElement('div')
  iconsArea.className = "icons";
  bookCard.appendChild(iconsArea);

  const editIcon = document.createElement("img");
  editIcon.className = "edit-icon";
  editIcon.src = "./img/edit-icon.png";
  iconsArea.appendChild(editIcon);

  const trashIcon = document.createElement("img");
  trashIcon.className = "trash-icon";
  trashIcon.src = "./img/trask-icon.png";
  iconsArea.appendChild(trashIcon);

  trashIcon.addEventListener("click", (e) => {
    const index = e.target.closest(".card").getAttribute("data-index");
    bookShelf.splice(index, 1);
    cardsContainer.removeChild(bookCard);

    const cards = document.querySelectorAll(".card");

    // Salvar no localSatorage:
    const bookShelfJSON = JSON.stringify(bookShelf);
    localStorage.setItem("bookShelf", bookShelfJSON);

    for (let i = 0; i < cards.length; i++) {
      cards[i].setAttribute("data-index", i);
    }

    
  });

  contentRead.addEventListener("change", (e) => {
    let readOrNot = e.target.closest(".read-or-not").checked;

    //Salvar no localSatorage:
    const bookShelfJSON = JSON.stringify(bookShelf);
    localStorage.setItem("checkboxState", readOrNot);
    if (this.checked) {
      localStorage.setItem("myCheckboxStatus", "checked");
    } else {
      localStorage.setItem("myCheckboxStatus", "unchecked");
    }
  });

    // Open edit modal
    editIcon.addEventListener("click", () => {
    editModalWrapper.classList.remove("hide");
    editBookTitle.focus();
    editBookTitle.value = "";
    editBookAuthor.value = "";
    editBookPages.value = "";
  });
  
    // Close edit modal
    editModalWrapper.addEventListener("click", (e) => {
    const classesThatClosePopup = ["edit-wrapper", "edit-modal-close"];
    const clickedElement = e.target.classList[0];
    let shouldClose = classesThatClosePopup.includes(clickedElement);
    if (shouldClose) editModalWrapper.classList.add("hide");
  });

  const editButtons = document.querySelectorAll('.edit-icon');

  editButtons.forEach(button => {

    button.addEventListener('click', (e) => {
        const bookCard = e.target.closest('.card');

        bId = bookCard.getAttribute("book-id");
        const bookTitle = bookCard.querySelector('.content-title').textContent;
        const bookAuthor = bookCard.querySelector('.content-author').textContent;
        const bookPages = bookCard.querySelector('.content-pages').textContent;


        // Display original data:
        editBookTitle.value = bookTitle;
        editBookAuthor.value = bookAuthor;
        editBookPages.value = bookPages;

        
    })

    
  })
  editSaveBook.addEventListener('click', (e) => {
    bookShelf.map((book) => {
        if(book.id === +bId) {
            book.Nome = editBookTitle.value;
            book.Autor = editBookAuthor.value;
            book.Páginas = editBookPages.value;
            
            const bookShelfJSON = JSON.stringify(bookShelf);
            localStorage.setItem("bookShelf", bookShelfJSON);
            
            editModalWrapper.classList.add('hide')
            location.reload()
        } else {
            return 
        }
    })
    
   
})

 
};

bookShelf.forEach((book, index) => {
  createBookCard(book, index);
});
