function loadBooks() {
  fetch("/books")
    .then((res) => res.json())
    .then((books) => {
      const tbody = document.getElementById("booksTableBody");
      tbody.innerHTML = "";
      books.forEach((book) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.year ?? ""}</td>
          <td>
            <button 
              type="button" 
              class="btn btn-warning btn-sm me-2" 
              onclick="editBook(${book.id}, \`${book.title}\`, \`${
          book.author
        }\`, \`${book.year ?? ""}\`)">
              Edit
            </button>
            <form action="/delete" method="POST" onsubmit="return confirm('Delete this book?')">
              <input type="hidden" name="id" value="${book.id}">
              <button type="submit" class="btn btn-danger btn-sm">Delete</button>
            </form>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

window.addEventListener("DOMContentLoaded", loadBooks);

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

document.querySelector("form")?.addEventListener("submit", () => {
  showNotification("Book added successfully!");
});

function editBook(id, title, author, year) {
  const form = document.querySelector("form");
  if (!form) return;

  let hiddenId = document.getElementById("bookId");
  if (!hiddenId) {
    hiddenId = document.createElement("input");
    hiddenId.type = "hidden";
    hiddenId.name = "id";
    hiddenId.id = "bookId";
    form.appendChild(hiddenId);
  }

  form.title.value = title;
  form.author.value = author;
  form.year.value = year;
  hiddenId.value = id;
}
