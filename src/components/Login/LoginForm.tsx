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
            message: "로그인 성공",
            description: `안녕하세요, ${data.userName}님`
          });
        })
        .catch((e) =>
          notification.error({
            message: "로그인 실패",
            description: `아이디와 비밀번호를 확인하세요.`,
            duration: 1,
          })
        );
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { getIsLogin } = this.props.authState;

    if (getIsLogin) {
      return <Redirect to="tab" />;
    }
    return (
      <div className={this.props.className} id="login">
        <div className="login-container">
          <div className="title-container">
            <span className="title">Drag-It</span>
          </div>
          <div className="form-container">
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
                  로그인
                </Button>
                <br />
                Drag-It에 처음이신가요? <a href="register">회원가입!</a>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

const styledForm = styled(WrappedNormalLoginForm)`

  .login-container {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e8e8e8;
    border-radius: 20px;

    margin-left: auto;
    margin-right: auto;
  }

  .title-container {
    margin: 3rem auto 0 auto;
    width: 80%;
    text-align: center;
    
    .title {
      font-family: "BMDoHyeon-OTF";
      font-size: 3rem;
      letter-spacing: 5px;
    }
  }

  .form-container {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    /* min-width: 500px; */
  }

  .login-form {
    margin-right: auto;
    margin-left: auto;

    padding-top: 3rem;

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
