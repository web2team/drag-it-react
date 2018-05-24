import * as React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
const FormItem = Form.Item;
import "./Login.less";

class NormalLoginForm extends React.Component<any, any> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login">
        <Row>
          <Col span={20} offset={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "아이디를 입력해주세요!" }
                  ]
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

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;
