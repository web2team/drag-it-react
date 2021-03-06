import * as React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  notification
} from "antd";
import { Styled } from "interface/global";
const { Option } = Select;
import { SelectPeople } from "./SelectPeople";
import { executePromise } from "helper/apolloConfig";
import { NEW_GRID_LAYOUT_ITEM_AND_NOTIFY } from "components/FloatingMenu/gql";
import { inject } from "mobx-react";
import { GridState } from "state/gridState";
import { GridLayoutItemType } from "interface/GridLayout";

interface Props extends Styled {
  visible: boolean;
  form: any;
  onClose: () => void;
  gridState?: GridState;
}
interface State {
  loading: boolean;
}
@inject("gridState")
class CreateChatting extends React.Component<Props, State> {
  state = { visible: false, loading: false };

  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        console.log(values);
        return;
      }
      this.setState({
        loading: true
      });
      const operation = {
        query: NEW_GRID_LAYOUT_ITEM_AND_NOTIFY,
        variables: {
          gridLayoutId: this.props.gridState.currentGridLayoutId,
          gridLayoutItemPropsInput: {
            type: GridLayoutItemType.CHATTING,
            chatThreadInput: {
              threadName: values.title,
              users: values.users.map((user) => ({ id: user.userId }))
            }
          }
        }
      };
      executePromise(operation)
        .then(({ data }) => {
          this.setState({ loading: false });
          this.onClose();
        })
        .catch((e) => {
          notification.error({
            message: "ERROR",
            description: `${e.message}`
          });
        });
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
          title="새로운 채팅 생성"
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
          zIndex={3000}
          destroyOnClose={true}
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
                  {getFieldDecorator("users", {
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
              취소
            </Button>
            <Button
              onClick={this.onSubmit}
              type="primary"
              loading={this.state.loading}
            >
              생성
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const formed = Form.create()(CreateChatting);
export { formed as CreateChatting };
