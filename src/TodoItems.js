import React, {Component} from "react";
import "./TodoItems.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faTrash, faPencilAlt} from '@fortawesome/fontawesome-free-solid'
import SelectTypes from "./SelectTypes";
import TaskStatus from "./TaskStatus";

class TodoItems extends Component {

    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
        this.markAsEditable = this.markAsEditable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            name: ''
        };
    }

    create(task) {
        let condition = true;
        if (this.props.selectType !== SelectTypes.ALL) condition = this.props.selectType === task.status;

        return condition
            ? (task.editable ?
                <div className={'input-group todoItem ' + (task.status === TaskStatus.COMPLETED ? 'done' : '')} key={task.key}>
                    <input type="text" className="form-control" placeholder="" aria-label=""
                           aria-describedby="basic-addon1" value={this.state.name} onChange={this.handleChange}
                           onKeyPress={(event) =>
                               event.key === 'Enter' ? this.update(task.key, this.state.name) : null}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button"
                                onClick={() => this.update(task.key, this.state.name)}>
                            Save
                        </button>
                    </div>
                </div>
                :
                <div className={'input-group todoItem ' + (task.status === TaskStatus.COMPLETED ? 'done' : '')} key={task.key}>
                    <div className="input-group-prepend">
                        <button className="btn" type="button" onClick={() => this.markAsDone(task.key)}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </button>
                    </div>
                    <input type="text" className="form-control" placeholder="" aria-label="" readOnly
                           aria-describedby="basic-addon1" value={task.name}/>
                    <div className="input-group-append">
                        <button className="btn btn-info" type="button"
                                onClick={() => this.markAsEditable(task.key, task.name)}>
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </button>
                        <button className="btn btn-danger" type="button" onClick={() => this.delete(task.key)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </div>) : null;
    }

    markAsDone(key) {
        this.props.markAsDone(key);
    }

    markAsEditable(key, name) {
        this.setState({name: name});
        this.props.markAsEditable(key);
    }

    delete(key) {
        this.props.delete(key);
    }

    handleChange(e) {
        this.setState({name: e.target.value});
    }

    update(key, newName) {
        this.props.update(key, newName);
    }

    render() {
        const taskEntries = this.props.entries;
        const listTasks = taskEntries.map(this.create);

        return (
            <div>
                {listTasks}
            </div>
        )
    }
}

export default TodoItems;