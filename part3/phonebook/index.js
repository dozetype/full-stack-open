require("dotenv").config();
const express = require("express");
let morgan = require("morgan");
const Person = require("./models/person");
const app = express();
// const requestLogger = (request, response, next) => {
//     console.log("Method:", request.method);
//     console.log("Path:  ", request.path);
//     console.log("Body:  ", request.body);
//     console.log("---");
//     next();
// };
app.use(express.static("dist")); //Allow Express to run frontend code, allowing backend to serve full stack
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
    Person.find({}).then((p) => res.json(p));
});

app.get("/info", (req, res) => {
    Person.countDocuments({}).then((count) => {
        res.send(
            `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
        );
    });
});

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then((p) => {
            if (p) {
                res.json(p);
            } else {
                res.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

// app.post("/api/persons", (req, res) => {
//     // TODO need to learn await and async for counter
//     const body = req.body;
//     if (!body.name || !body.number)
//         return res.status(404).json({ error: "The name or number is missing" });
//     if (Person.find((p) => p.name === body.name))
//         return res
//             .status(404)
//             .json({ error: "The name already exists in the phonebook" });
//     const p = {
//         id: Math.floor(Math.random() * 1000).toString(),
//         name: body.name,
//         number: body.number,
//     };
//     console.log(body);
//     persons = persons.concat(p);
//     res.json(p);
// });

app.post("/api/persons", (req, res, next) => {
    const { name, number } = req.body;

    if (!name || !number) {
        //doesnt work
        return res.status(400).json({ error: "content missing" });
    }

    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then((savedP) => {
            res.json(savedP);
        })
        .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
    const { number } = req.body;

    Person.findById(req.params.id)
        .then((p) => {
            if (!p) {
                return res.status(404).end();
            }

            // p.name = name;
            p.number = number;

            return p.save().then((updatedPerson) => {
                res.json(updatedPerson);
            });
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" });
    } else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    }

    next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001; //check if environment PORT exists
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
