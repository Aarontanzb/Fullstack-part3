const PersonForm = ({ handleAddName, name, number, handleChangeName, handleChangeNumber }) => {
    return (
    <form onSubmit={handleAddName}>
      <div>
        name: <input value={name} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={number} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default PersonForm