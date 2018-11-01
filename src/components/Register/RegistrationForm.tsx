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
import { styled } from "theme";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import axios from "axios";
import { API_ENDPOINT } from "constants/urls";
import { inject } from "mobx-react";

@inject("browserHistoryState")
class RegistrationForm extends React.Component<any, any> {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // validation을 적용하고 오류가 발생하면 스크롤을 내림
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }
      // ES6 Destucturing 
      const { email, password, userName, phone } = values;

      // Ajax Call -> payload: 앞서 받았던 유저정보
      axios
        .post(`${API_ENDPOINT}/register`, {
          email,
          password,
          userName,
          phone
        })
        .then(() => {
          notification.success({
            message: "회원가입 성공",
            description: "성공적으로 등록되었습니다. 로그인 해주세요."
          });

          this.props.browserHistoryState.push("");
        })
        .catch(({ response: { data: { message } } }) => {
          notification.error({
            message: "회원가입 실패",
            description: `중복된 아이디가 존재합니다.`
          });
        });
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // 패스워드 비교함수 1
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("비밀번호가 일치하지 않습니다");
    } else {
      callback();
    }
  };

  // 패스워드 비교함수 2 
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
                  <Tooltip title="사용자 이름">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "이름을 입력해주세요.",
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
  max-width: 65vw;
  margin: auto;

  margin-top: 2rem;
`;
export { styledWrapped as RegistrationForm };
