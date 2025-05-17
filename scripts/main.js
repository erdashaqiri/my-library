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
