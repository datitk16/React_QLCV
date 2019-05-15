import React, {Component} from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: true
        }
    }

    formExit = () => {
        this.props.formExit();
    }
    //thêm chông việc
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        })

    }
    //submit form
    onSubmit = (event) => {
        // console.log(this.state)
        this.props.onSubmit(this.state);
        event.preventDefault();
    }


    //cập nhật
    componentWillMount() {
        if (this.props.TaskEdit) {
            this.setState({
                id: this.props.TaskEdit.id,
                name: this.props.TaskEdit.name,
                status: this.props.TaskEdit.status
            })
            console.log(this.state)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.TaskEdit) {
            this.setState({
                id: nextProps.TaskEdit.id,
                name: nextProps.TaskEdit.name,
                status: nextProps.TaskEdit.status
            })
            console.log(this.state)
        } else if (nextProps && nextProps.TaskEdit === null) {
            this.setState({
                id:'',
                name:'',
                status:false    
            })
        }
    }

    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {/*{ !this.state.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc' }*/}
                        {!this.state.id ? 'Thêm công việc' : 'Cập nhật công việc'}
                        {/*Cập nhật công việc*/}
                        <span
                            className="fa fa-times-circle text-right ml-5"
                            onClick={this.formExit}

                        ></span>


                    </h3>

                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}

                            />

                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>
                            &nbsp;
                            <button type="button" className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;