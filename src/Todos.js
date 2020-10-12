import React, {Component} from "react";
import TodoItems from "./TodoItems";
import "./Todos.css";
import SelectTypes from "./SelectTypes";
import TaskStatus from "./TaskStatus";

class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            selectType: SelectTypes.ALL
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
        this.markAsEditable = this.markAsEditable.bind(this);
        this.update = this.update.bind(this);
        this.changeSelectType = this.changeSelectType.bind(this);
    }

    add(e) {
        if (this._inputElement.value) {
            const _newTask = {
                name: this._inputElement.value,
                key: Date.now(),
                status: TaskStatus.INCOMPLETE,
                editable: false
            };
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(_newTask)
                }
            })
        } else alert("Task cannot be an empty!");
        this._inputElement.value = "";
        e.preventDefault();
    }

    delete(key) {
        const filteredTasks = this.state.tasks.filter(item => item.key !== key);
        this.setState({
            tasks: filteredTasks
        })
    }

    markAsDone(key) {
        const ind = this.state.tasks.findIndex(item => item.key === key);
        let newState = [...this.state.tasks];
        let foundState = newState[ind];
        if (foundState.status === TaskStatus.INCOMPLETE) foundState.status = TaskStatus.COMPLETED;
        else foundState.status = TaskStatus.INCOMPLETE;
        this.setState({tasks: [...newState]});
    }

    markAsEditable(key) {
        const ind = this.state.tasks.findIndex(item => item.key === key);
        let newState = [...this.state.tasks];
        let foundState = newState[ind];
        foundState.editable = !foundState.editable;
        this.setState({tasks: [...newState]});
    }

    update(key, newName = '') {
        const ind = this.state.tasks.findIndex(item => item.key === key);
        let newState = [...this.state.tasks];
        let foundState = newState[ind];
        foundState.name = newName;
        foundState.editable = false;
        this.setState({tasks: [...newState]});
    }

    changeSelectType(event) {
        this.setState({selectType: event.target.value});
    }

    render() {
        return (
            <div id="todoListMain">
                <div id="addTask">
                    <form className="form-inline" onSubmit={this.add}>
                        <div className="form-group mb-2">
                            <input className="form-control input-text" ref={(text) => this._inputElement = text}
                                   type="text"
                                   placeholder="Enter task"/>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2 add-button">Add</button>
                        <div className="form-group mb-2">
                            <select className="form-control" onChange={this.changeSelectType}
                                    value={this.state.selectType}>
                                <option value="ALL">All</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="INCOMPLETE">Incomplete</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div id="todoItems">
                    <TodoItems entries={this.state.tasks} selectType={this.state.selectType} delete={this.delete}
                               markAsDone={this.markAsDone}
                               markAsEditable={this.markAsEditable} update={this.update}/>
                </div>
            </div>
        );
    }
}

export default Todos;