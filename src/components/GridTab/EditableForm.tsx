import * as React from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { styled } from "theme";
import { Styled } from "interface/global";

const FormItem = Form.Item;
interface Props extends Styled {
  editable: boolean;
  dataIndex: number;
  data: any[];
  title: string;
  form: any;
}
class EditableForm extends React.Component<Props, any> {
  state = {
    editing: false
  };
  input: any;
  cell: any;
  form: any;

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener("click", this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener("click", this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  save = () => {
    this.props.form.validateFields((error, values) => {
      console.log(values);

      if (error) {
        return;
      }
      this.toggleEdit();
    });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, data, ...restProps } = this.props;
    return (
      <div className={this.props.className} ref={(node) => (this.cell = node)}>
        {editable ? (
          editing ? (
            <div className="editable-cell-edit-wrap">
              <FormItem>
                {this.props.form.getFieldDecorator("dataIndex", {
                  rules: [
                    {
                      required: true,
                      message: `${title}을(를) 입력해주세요.`
                    }
                  ],
                  initialValue: data[dataIndex]
                })(
                  <Input
                    ref={(node) => (this.input = node)}
                    onPressEnter={this.save}
                  />
                )}
              </FormItem>
            </div>
          ) : (
            <div
              className="editable-cell-value-wrap"
              onDoubleClick={this.toggleEdit}
            >
              {data[dataIndex]}
            </div>
          )
        ) : (
          restProps.children
        )}
      </div>
    );
  }
}

const EditableFormEditableForm = Form.create()(EditableForm);
const styledEditableFormEditableForm = styled(EditableFormEditableForm)`
  display: inline-block;
  line-height: 30px;
  margin: 5px 0;

  .editable-cell {
    position: relative;
  }

  .editable-cell-value-wrap {
    padding: 0 5px;
    cursor: pointer;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  }

  .ant-form-explain {
    position: fixed !important;
    margin-top: 2px;
  }
`;

export { styledEditableFormEditableForm as EditableForm };
