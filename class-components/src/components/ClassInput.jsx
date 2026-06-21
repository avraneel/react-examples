import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.filter((t) => t !== e.target.className),
      inputVal: '',
    }));
  }

  render() {
    const ob = new Count(this.state.todos.length);
    console.log(ob);
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
          {this.state.todos.map((todo) => (
            <li key={todo}>
              {todo}
              <button onClick={this.handleDelete} className={todo}>
                Delete
              </button>
            </li>
          ))}
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
