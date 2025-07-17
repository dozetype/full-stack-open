import { useState } from "react";
import Display from "./Display";

const Countries = ({ countries, search }) => {
    const [shownCountry, setShownCountry] = useState(null);

    const filtered = countries.filter((c) =>
        c.name.official.toLowerCase().includes(search.toLowerCase()),
    );
    if (filtered.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    } else if (filtered.length != 1) {
        return (
            <div>
                {filtered.map((c) => (
                    <div key={c.cca3}>
                        {c.name.official}
                        <button onClick={() => setShownCountry(c)}>Show</button>
                        {shownCountry && shownCountry.cca3 === c.cca3 && (
                            <Display country={c} />
                        )}
                    </div>
                ))}
            </div>
        );

    } else {
        return <Display country={filtered[0]} />;
    }
};

export default Countries;
