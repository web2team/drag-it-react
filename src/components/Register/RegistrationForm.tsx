import * as React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Select,
  Row,
  Col,
  Button,
  AutoComplete,
  notification
} from "antd";
import styled from "theme";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import axios from "axios";
import { API_ENDPOINT } from "constants/urls";

class RegistrationForm extends React.Component<any, any> {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }
      const { email, password, userName, phone } = values;

      axios
        .post(`${API_ENDPOINT}/register`, {
          email,
          password,
          userName,
          phone
        })
        .then(() =>
          notification.success({
            message: "SUCCESS",
            description: "성공적으로 등록되었습니다."
          })
        )
        .catch(({ response: { data: { message } } }) => {
          notification.error({
            message: "Fail to register",
            description: `회원가입에 실패했습니다. ${message}`
          });
        });
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "010"
    })(
      <Select style={{ width: 70 }}>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
      </Select>
    );

    const websiteOptions: any = autoCompleteResult.map((website) => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Row className={this.props.className}>
        <Col span={20}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="이메일">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "유효한 이메일 형식이 아닙니다."
                  },
                  {
                    required: true,
                    message: "이메일을 입력해주세요."
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="비밀번호">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "비밀번호를 입력해주세요."
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="비밀번호 확인">
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "비밀번호를 다시 한 번 입력해주세요."
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  사용자 이름&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="핸드폰 번호">
              {getFieldDecorator("phone", {
                rules: []
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                회원가입하기!
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
const styledWrapped = styled(WrappedRegistrationForm)`
  margin-top: 2rem;
`;
export { styledWrapped as RegistrationForm };
