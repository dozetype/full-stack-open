const Header = (props) => <h2>{props.course}</h2>;

const Content = ({ parts }) => (
    <div>
        {parts.map((part, id) => (
            <Part key={id} part={part} />
        ))}
    </div>
);

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
);

const Total = ({ parts }) => {
    let total = parts.reduce((sum, i) => (sum += i.exercises), 0);
    return (
        <p>
            <b>Number of exercises {total}</b>
        </p>
    );
};

const Course = ({ course }) => {
    const { name, parts } = course;
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default Course;
