const Person = ({ person, handleDelete }) => <li>{person.name} {person.number} <button onClick={handleDelete}>delete</button></li>

const Persons = ({ persons, handleDelete }) =>
    <ul>
        {persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete(person.id, person.name)} />)}
    </ul>
    
export default Persons