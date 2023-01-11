const Filter = ({ query, handleChange }) => 
    <div>
        filter shown with <input value={query} onChange={handleChange} />
    </div>

export default Filter