const Display = ({country}) => {
    return(
        <div>
            <h1>{country.name.official}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((lang, index) => (
                    <li key={index}>{lang}</li>
                ))}
            </ul>
            <img src={country.flags.png}></img>
        </div>
    )
}

export default Display;
