import * as React from "react";
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  notification
} from "antd";
import axios from "axios";
const FormItem = Form.Item;
import styled from "theme";
import { API_ENDPOINT } from "constants/urls";
import { setToken } from "state/helper";
import { inject } from "mobx-react";

@inject("authState")
class LoginForm extends React.Component<any, any> {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }
      
      axios
        .post(`${API_ENDPOINT}/login`, {
          id: values.id,
          pw: values.pw
        })
        .then(({ data }) => setToken(data.token))
        .catch((e) =>
          notification.error({
            description: "ERROR",
            message: "로그인 에러"
          })
        );
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div id="login">
        <Row className={this.props.className}>
          <Col span={20} offset={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("id", {
                  rules: [{ required: true, message: "아이디를 입력해주세요!" }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="아이디"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("pw", {
                  rules: [
                    { required: true, message: "비밀번호를 입력해주세요!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="비밀번호"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>로그인 상태 유지</Checkbox>)}
                <a className="login-form-forgot" href="">
                  비밀번호 찾기
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  로그인!
                </Button>
                Drag-it에 처음이신가요? <a href="">회원가입!</a>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

const styledForm = styled(WrappedNormalLoginForm)`
  .login-form {
    max-width: 300px;
    max-height: 300px;
    padding-top: 10rem;

    .ant-input {
      min-height: 0;
    }
  }

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
    height: auto;
  }

  #login {
    transform: scale(1.2);
  }
`;

export { styledForm as LoginForm };
