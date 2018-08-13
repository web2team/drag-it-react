import * as React from "react";
import { Input, Form, Spin } from "antd";
import { styled } from "theme";
import { Styled } from "interface/global";
import { excute } from "helper/apolloConfig";
import { GraphQLRequest } from "apollo-link";

const FormItem = Form.Item;
interface Props extends Styled {
  editable: boolean;
  data: any;
  form?: any;

  request: GraphQLRequest;
  dataFieldName: string;
}
interface State {
  editing: boolean;
  data: any;
  loading: boolean;
}
class EditableForm extends React.Component<Props, State> {
  input: any;
  cell: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      editing: false,
      data: props.data || "",
      loading: false
    };
  }

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
      if (error) {
        return;
      }
      this.setState({ loading: true });
      this.toggleEdit();

      if (!this.props.request) {
        return;
      }
      const { query, variables } = this.props.request;

      const operation: any = {
        query,
        variables: {
          ...variables,
          formData: values.formData
        }
      };

      const queryName = operation.query.definitions[0].name.value;
      excute(operation).then(({ data }) =>
        this.setState({
          loading: false,
          data: data[queryName][this.props.dataFieldName]
        })
      );
    });
  };

  render() {
    const { editing, data } = this.state;
    const { editable } = this.props;

    return (
      <div className={this.props.className} ref={(node) => (this.cell = node)}>
        <Spin spinning={this.state.loading}>
          {editable ? (
            editing ? (
              <div className="editable-cell-edit-wrap">
                <FormItem>
                  {this.props.form.getFieldDecorator("formData", {
                    rules: [
                      {
                        required: true,
                        message: `내용을 입력해주세요.`
                      }
                    ],
                    initialValue: data
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
                {data}
              </div>
            )
          ) : (
            data
          )}
        </Spin>
      </div>
    );
  }
}

const EditableFormEditableForm = Form.create()(EditableForm as any);
const styledEditableFormEditableForm = styled(EditableFormEditableForm as any)`
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

  .ant-spin-blur {
    overflow: initial;
  }
`;

export { styledEditableFormEditableForm as EditableForm };
