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

  // Form submit Handler. 
  // validation과 ajax 호출을 담당. 
  // 각 validation은 각각의 폼 데이터에서 한 번 처리 후 최종 결과를 반환
  // UI 피드백까지 처리 (antd)
  handleSubmit = (e) => {
    // 기본 HTML event dispatch 방지
    e.preventDefault();
    // HOC로 주입된 form 인스턴스에서 각 값을 가져오기 
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log("Received values of form: ", values);
        return;
      }

      // AJAX call 부분. (모듈화)
      // 정상적 응답 후 mobx store에 유저 정보 저장
      requestLogin(values)
        .then(({ data }) => {
          this.props.authState.setToken(data.token);
          this.props.authState.setUserId(data.userId);
          this.props.authState.setIsLogin(true);
          
          console.log(data);
          return data;
        })
        // 성공 피드백 메시지
        .then((data) => {
          notification.success({
            message: "로그인 성공",
            description: `안녕하세요, ${data.userName}님`
          });
        })
        // 실패 피드백 메시지
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

    // 로그인 정보가 남아 있는 경우 재로그인 과정 생략. 바로 프로젝트화면으로 Redirect
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
            {/* From Wrapper 선언 및 핸들러 등록 */}
            <Form onSubmit={this.handleSubmit} className="login-form">
              {/* 각 레이블 별 아이템과 validator 등록 */}
              <FormItem>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "이메일을 입력해주세요!" }]
                })(
                  // 일반 텍스트 입력 컴포넌트. 
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
                    // 패스워드 타입으로 보여지는 것 방지
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

// Form instance 만들고 클래스 주입
// React HOC -> High order component
const WrappedNormalLoginForm = Form.create()(LoginForm);

const styledForm = styled(WrappedNormalLoginForm)`

  /* FLEX 사용해서 반응형 CSS 구현 */
  .login-container {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e8e8e8;
    border-radius: 20px;

    margin-left: auto;
    margin-right: auto;
    margin-top: 15vh;
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
