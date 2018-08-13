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
const FormItem = Form.Item;
import { styled } from "theme";
import { inject, observer } from "mobx-react";
import { requestLogin } from "request/auth";
import { Redirect } from "react-router-dom";

@inject("authState")
@observer
class LoginForm extends React.Component<any, any> {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }

      requestLogin(values)
        .then(({ data }) => {
          this.props.authState.setToken(data.token);
          this.props.authState.setUserId(data.userId); 
          this.props.authState.setIsLogin(true);

          console.log(data);
          return data;
        })
        .then((data) => {
          notification.success({
            message: "SUCCESS",
            description: `안녕하세요, ${data.userName}님`
          });
        })
        .catch((e) =>
          notification.error({
            message: "Fail to Login",
            description: `${e}`
          })
        );
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { getIsLogin } = this.props.authState;

    if (getIsLogin) {
      return <Redirect to="home" />;
    }
    return (
      <div id="login">
        <Row className={this.props.className}>
          <Col span={20} offset={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "이메일을 입력해주세요!" }]
                })(
                  <Input
                    id="email"
                    className="login-form-input"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="email"
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "비밀번호를 입력해주세요!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="password"
                    size="large"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button
                  id="submit"
                  className="login-form-button"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  Sign In
                </Button>
                <br />
                Drag-it에 처음이신가요? <a href="register">회원가입!</a>
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
    height: 2rem;
    margin: 1rem 0 1rem 0;
  }

  #login {
    transform: scale(1.2);
  }
`;

export { styledForm as LoginForm };
