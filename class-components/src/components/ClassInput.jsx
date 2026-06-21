import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          name: 'Just some demo tasks',
          edit: false,
        },
        {
          name: 'As an example',
          edit: false,
        },
      ],
      inputVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditInputChange = this.handleEditInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleEditInputChange(e, index) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((t, i) =>
        i === index ? { ...t, name: e.target.value } : t,
      ),
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleResubmit(e) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((t) =>
        t.name === e.target.className ? { name: t.name, edit: false } : t,
      ),
    }));
  }

  handleDelete(e) {
    this.setState((state) => ({
      todos: state.todos.filter((t) => t.name !== e.target.className),
      inputVal: '',
    }));
  }

  handleEdit(e) {
    this.setState((state) => ({
      todos: state.todos.map((t) =>
        t.name === e.target.className ? { name: t.name, edit: true } : t,
      ),
      inputVal: '',
    }));
  }

  render() {
    const ob = new Count(this.state.todos.length);
    console.log(this.state);
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {ob.render()}
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo, index) =>
            todo.edit ? (
              <>
                <input
                  type="text"
                  value={todo.name}
                  onChange={(e) => this.handleEditInputChange(e, index)}
                ></input>
                <button onClick={this.handleResubmit} className={todo.name}>
                  Resubmit
                </button>
              </>
            ) : (
              <li key={todo.name}>
                {todo.name}
                <button onClick={this.handleDelete} className={todo.name}>
                  Delete
                </button>
                <button onClick={this.handleEdit} className={todo.name}>
                  Edit
                </button>
              </li>
            ),
          )}
        </ul>
      </section>
    );
  }
}

export default ClassInput;

class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <p>Count {this.props}</p>;
  }
}
