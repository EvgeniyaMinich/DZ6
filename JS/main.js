document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
});

function loadBooks() {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const library = document.getElementById('library');

    books.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>${book}</div>
        <button onclick="editBook(this)">Редактировать</button>
        <button onclick="deleteBook(this)">Удалить</button>
      `;
    library.appendChild(li);    
    });
  filterBooks();
} 

function addBook() {  
  const bookInput = document.getElementById('bookInput');
  const bookText = bookInput.value.trim();

  const authorInput = document.getElementById('authorInput');
  const authorText = authorInput.value.trim();

  const yearInput = document.getElementById('yearInput');
  const yearText = yearInput.value.trim();

  const genreInput = document.getElementById('genreInput');
  const genreText = genreInput.value.trim();

  const selectElement = document.getElementById("status");
  const status = selectElement.value.trim();
  
  if (bookText === '' || authorText === '' || yearText === '' || genreText === '') return;

  const library = document.getElementById('library');
  const li = document.createElement('li');
  li.innerHTML = `
    <div>${bookText}. / ${authorText}, ${yearText} г. / ${genreText}. / ${status} /</div>        
    <button onclick="editBook(this)">Редактировать</button>
    <button onclick="deleteBook(this)">Удалить</button>
  `;
  library.appendChild(li);
  bookInput.value = '';
  authorInput.value = '';
  yearInput.value = '';
  genreInput.value = '';
  saveBook();
  filterBooks();      
}

function saveBook() {
  const library = document.getElementById('library');
  const books = Array.from(library.children).map(li => li.querySelector('div').textContent);
  localStorage.setItem("books",JSON.stringify(books));
}

function deleteBook(button) {
  const li = button.parentElement;

  li.remove();
  saveBook();
  filterBooks();
}

function editBook(button) {
  const li = button.parentElement;
  const bookText = li.querySelector('div').textContent;
  const newBookText = prompt ('Редактировать книгу',bookText);

  if (newBookText !==null && newBookText.trim() !==''){
    li.querySelector('div').textContent = newBookText.trim();

    saveBook();
    filterBooks();
  }
}

function filterBooks() {
  const filterInput = document.getElementById('filterInput');
  const filterText = filterInput.value.toLowerCase();
  const library = document.getElementById('library');

  Array.from(library.children).forEach(li => {
    const bookText = li.querySelector('div').textContent.toLowerCase();

    if (bookText.includes(filterText)) {
      li.style.display = "";      
    } else {
      li.style.display = 'none';
    }
  })
}

function deleteLibrary() {
  const library = document.getElementById('library');
  library.remove();
  localStorage.clear();
  }