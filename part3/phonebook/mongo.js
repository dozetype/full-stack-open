const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2]; //Extracting input from CLI
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://dozetype:${password}@cluster0.gjs4q0h.mongodb.net/phonebookDB?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && phoneNumber) {
    const person = new Person({
        name: name,
        number: phoneNumber,
    });

    person.save().then(() => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`);
        return Person.find({}); // Gotta return to chain
    }).then((result) => {
        console.log("\nphonebook:")
        result.forEach((p) => {
            console.log(p.name, p.number);
        });
        mongoose.connection.close();
    })
}
else{
    Person.find({}).then((result) => {
        console.log("\nphonebook:")
        result.forEach((p) => {
            console.log(p.name, p.number);
        });
        mongoose.connection.close();
    });
}
