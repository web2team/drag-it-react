import * as React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker
} from "antd";
import { Styled } from "interface/global";
const { Option } = Select;
import { SelectPeople } from "./SelectPeople";

interface Props extends Styled {
  visible: boolean;
  form: any;
  onClose: () => void;
}
class CreateChatting extends React.Component<Props, any> {
  state = { visible: false };

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        console.log(values);
        return;
      }
      this.onClose();
      console.log(values);
    });
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="Create New Chatting Thread"
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.props.visible}
          width="auto"
          style={{
            height: "calc(100% - 55px)",
            overflow: "auto",
            paddingBottom: 53
          }}
        >
          <Form layout="vertical">
            <Row>
              <Col>
                <Form.Item label="Title">
                  {getFieldDecorator("title", {
                    rules: [
                      { required: true, message: "채팅방 제목을 입력해주세요" }
                    ]
                  })(<Input placeholder="채팅방 제목을 입력해주세요" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item label="Description">
                  {getFieldDecorator("description", {
                    rules: [
                      {
                        required: false
                      }
                    ]
                  })(
                    <Input.TextArea
                      rows={4}
                      placeholder="채팅방 설명을 입력해주세요. (선택)"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item label="Select People to Chat">
                  {getFieldDecorator("people", {
                    rules: [
                      {
                        required: true,
                        message: "대화를 나눌 인원을 선택해주세요."
                      }
                    ]
                  })(<SelectPeople />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e8e8e8",
              padding: "10px 16px",
              textAlign: "right",
              left: 0,
              background: "#fff",
              borderRadius: "0 0 4px 4px"
            }}
          >
            <Button
              style={{
                marginRight: 8
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const formed = Form.create()(CreateChatting);
export { formed as CreateChatting };
