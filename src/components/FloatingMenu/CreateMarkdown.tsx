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
class CreateMarkdown extends React.Component<Props, State> {
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
            type: GridLayoutItemType.TEXT_EDITOR,
            chatThreadInput: {
              threadName: "",
              users: []
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
          title="새로운 마크다운 에디터(문서) 생성"
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.props.visible}
          width="auto"
          style={{
            height: "calc(100% - 55px)",
            overflow: "auto",
            paddingBottom: 53,
            paddingRight: 100
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
                      { required: true, message: "문서 제목을 입력해주세요" }
                    ]
                  })(<Input placeholder="문서 제목을 입력해주세요" />)}
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

const formed = Form.create()(CreateMarkdown);
export { formed as CreateMarkdown };
