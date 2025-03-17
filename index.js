const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];


app.get('/whoami', (req, res) => {
    res.json({ studentNumber: "2440170" });
});


app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});


app.post('/books', (req, res) => {
    const { id, title, details } = req.body;
    if (!id || !title || !Array.isArray(details)) {
        return res.status(400).json({ error: "Missing required book details" });
    }
    books.push({ id, title, details });
    res.status(201).json({ message: "Book added successfully" });
});


app.put('/books/:id', (req, res) => {
    const { title, details } = req.body;
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
    books[bookIndex] = { ...books[bookIndex], title, details };
    res.json({ message: "Book updated successfully" });
});


app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    
    const { id, author, genre, publicationYear } = req.body;
    if (!id || !author || !genre || !publicationYear) {
        return res.status(400).json({ error: "Missing required detail fields" });
    }
    book.details.push({ id, author, genre, publicationYear });
    res.status(201).json({ message: "Detail added successfully" });
});

//
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    
    const detailIndex = book.details.findIndex(d => d.id === req.params.detailId);
    if (detailIndex === -1) return res.status(404).json({ error: "Detail not found" });
    book.details.splice(detailIndex, 1);
    res.json({ message: "Detail deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

