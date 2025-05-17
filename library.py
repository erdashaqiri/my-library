from flask import Flask, request, redirect, url_for, render_template
import sqlite3

app = Flask(__name__)
DB_FILE = "library.db"

@app.route("/")
def index():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT * FROM books")
    books = c.fetchall()
    conn.close()
    return render_template("index.html", books=books)

@app.route("/add", methods=["POST"])
def add_book():
    title = request.form.get("title")
    author = request.form.get("author")
    year = request.form.get("year")

    if title and author:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute(
            "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            (title, author, int(year) if year and year.isdigit() else None)
        )
        conn.commit()
        conn.close()
    return redirect(url_for("index"))

@app.route("/delete/<int:book_id>", methods=["POST"])
def delete_book(book_id):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("DELETE FROM books WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
