import React, {Component} from 'react';
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            isDisPlayForm: false,
            TaskEdit: null

        }
    }

    componentWillMount() {

        if (localStorage && localStorage.getItem('Task')) {
            var componentWillMount = JSON.parse(localStorage.getItem('Task'));
            this.setState({
                task: componentWillMount
            })
        }
    }

    GenerateData = () => {
        var GenerateData1 = [
            {
                id: this.GenerateID(),
                name: 'Hoc AngularJs',
                status: false

            },
            {
                id: this.GenerateID(),
                name: 'Hoc ReactJS',
                status: true

            },
            {
                id: this.GenerateID(),
                name: 'Hoc ReactNative',
                status: true

            }

        ];
        localStorage.setItem('Task', JSON.stringify(GenerateData1))


        this.setState({

            task: GenerateData1
        })

    }
    //thêm task
    onToggleForm = () => {
        if (this.state.isDisPlayForm && this.state.TaskEdit !== null) {
            this.setState({
                isDisPlayForm: true,
                TaskEdit: null
            })
        } else {
            this.setState({
                isDisPlayForm: !this.state.isDisPlayForm,
                TaskEdit: null
            })
        }

    }
    //Đóng form
    formExit = () => {
        this.setState({
            isDisPlayForm: false
        })

    }
    //submitform
    onSmitForm = (data) => {
        var {task} = this.state;
        if (data.id === '') {
            //thêm
            data.id = this.GenerateID();
            task.push(data);
        } else {
            //Sửa
            var index = this.finIndex(data.id);
            task[index] = data
        }


        this.setState({
            task: task,
            TaskEdit: null
        })
        localStorage.setItem('Task', JSON.stringify(task));
        data.preventDefault()
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

    }

    GenerateID() {
        return this.s4() + this.s4() + '-' + this.s4();
    }

    //cập nhật status
    updateStatus = (id) => {
        // console.log(id)
        var {task} = this.state;
        var index = this.finIndex(id);
        if (index !== -1) {
            task[index].status = !task[index].status;
            this.setState({
                task: task
            })
            localStorage.setItem('Task', JSON.stringify(task))
        }

    }
    //Tìm index
    finIndex = (id) => {
        var taskID = this.state.task;
        var resul = -1;
        taskID.forEach((task, index) => {
            if (task.id === id) {
                resul = index
            }
        });
        return resul;
    }
    //xóa
    delete = (id) => {
        var {task} = this.state;
        var index = this.finIndex(id);
        console.log(index)
        if (index !== -1) {
            task.splice(index, 1);
            this.setState({
                task: task
            })
            localStorage.setItem('Task', JSON.stringify(task))

        }
    }
    //Chỉnh sửa
    onUpdateApp = (id) => {
        var {task} = this.state;
        var index = this.finIndex(id);
        var TaskEdit = task[index];
        this.setState({
            TaskEdit: TaskEdit
        })
        // console.log(TaskEdit)
        this.showForm()
    }
    showForm = () => {
        this.setState({
            isDisPlayForm: true

        })
    }


    render() {
        // console.log(this.props.updateStatus)
        var {TaskEdit} = this.state;
        var {task, isDisPlayForm} = this.state;
        var elmTaskForm = isDisPlayForm ? <TaskForm
            formExit={this.formExit}
            onSubmit={this.onSmitForm}
            TaskEdit={TaskEdit}
        /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisPlayForm === true ? 'col-4' : ''}>
                        {elmTaskForm}
                    </div>
                    <div className={isDisPlayForm === true ? 'col-8' : 'col-12'}>


                        <button type="button"
                                onClick={this.onToggleForm}
                                data-toggle="modal" data-target="#exampleModal"
                                className="btn btn-danger m-5">

                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        <button type="button"
                                onClick={this.GenerateData}
                                className="btn btn-success m-5">
                            <span className="fa fa-plus mr-5"></span>
                            GenerateData
                        </button>
                        <TaskList
                            sendTask={task}
                            updateStatus={this.updateStatus}
                            delete={this.delete}
                            onUpdateList={this.onUpdateApp}
                        />


                    </div>
                </div>
            </div>
        );
    }
}

export default App;