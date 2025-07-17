import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import service from "./service/countries.js";

const App = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        service.getAll().then((res) => setCountries(res));
    }, []);
    
    // console.log(countries[0])

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    return (
        <div>
            find countries{" "}
            <input value={search} onChange={handleSearchChange} />
            <Countries countries={countries} search={search} />
        </div>
    );
};

export default App;
