import sqlite3

conn = sqlite3.connect("library.db")
cur = conn.cursor()

# Create table
cur.execute("""
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER
)
""")

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ("1984", "George Orwell", 1949))
cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ("To Kill a Mockingbird", "Harper Lee", 1960))

conn.commit()
conn.close()

print("Database initialized with 2 books.")
