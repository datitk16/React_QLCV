import React, {Component} from 'react';

class TaskItem extends Component {
    Status = () => {
        this.props.updateStatus(this.props.TaskItem.id)
    }
    upDateStatus = () => {
        return <span
            onClick={this.Status}
        >
               {this.props.TaskItem.status === true ? 'Kích hoạt' : 'Ẩn'}
        </span>
    }
    delete = () => {
        this.props.delete(this.props.TaskItem.id);
    }
    onUpdate=()=>{
        this.props.onUpdateEdit(this.props.TaskItem.id);
    }

    render() {
        // console.log(this.props.TaskItem)

        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.TaskItem.name}</td>
                <td className="text-center"
                    // onClick={this.getIndex2}


                >
                    {/*{receiveItem.status == true ? 'Kích Hoạt' : 'Ẩn '}*/}

                    {this.upDateStatus()}
                </td>
                <td className="text-center">
                    <button

                        data-toggle="modal" data-target="#exampleModal"
                        type="button"
                        className="btn btn-warning"
                       onClick={this.onUpdate}
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button" className="btn btn-danger"
                        onClick={this.delete}
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;