const express = require("express");
let persons = require("./persons");
let morgan = require('morgan')
const app = express();
// const requestLogger = (request, response, next) => {
//     console.log("Method:", request.method);
//     console.log("Path:  ", request.path);
//     console.log("Body:  ", request.body);
//     console.log("---");
//     next();
// };
app.use(express.static('dist')) //Allow Express to run frontend code, allowing backend to serve full stack
app.use(express.json());
app.use(morgan('tiny'))
// app.use(requestLogger);

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`,
    );
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const p = persons.find((p) => p.id === id);
    if (p) res.json(p);
    else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    persons = persons.filter((p) => p.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body;
    if (!body.name || !body.number)
        return res.status(404).json({ error: "The name or number is missing" });
    if (persons.find((p) => p.name === body.name))
        return res
            .status(404)
            .json({ error: "The name already exists in the phonebook" });
    const p = {
        id: Math.floor(Math.random() * 1000).toString(),
        name: body.name,
        number: body.number,
    };
    console.log(body);
    persons = persons.concat(p);
    res.json(p);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001 //check if environment PORT exists
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
