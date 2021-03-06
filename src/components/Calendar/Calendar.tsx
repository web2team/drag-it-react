import * as React from "react";
import {
  Calendar,
  Badge,
  Dropdown,
  Menu,
  Modal,
  Form,
  Button,
  Input,
  Select
} from "antd";
const SubMenu = Menu.SubMenu;

import { styled } from "theme";

import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const FormItem = Form.Item;
const Option = Select.Option;

class MyCalendar extends React.Component<any, any> {
  container: HTMLDivElement;

  state = {
    fullscreen: true,
    modalVisible: false
  };

  // 날짜에 대한 데이터 파싱
  // JSON 구조화를 시켜서 view 에 넘겨줌
  getListData = (value: any) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "캡스톤 회의" },
          { type: "success", content: "회의록 작성" }
        ];
        break;
      case 21:
        listData = [
          { type: "warning", content: "캡스톤 회의" },
          { type: "success", content: "발표자료 초안 완성" },
          { type: "error", content: "저녁 약속" }
        ];
        break;
      case 23:
        listData = [{ type: "success", content: "발표자료 최종본 완성" }];
        break;
      case 25:
        listData = [{ type: "warning", content: "캡스톤 발표" }];
        break;
      default:
    }
    return listData || [];
  };

  toggleShowModal = () => {
    this.setState((prev) =>
      this.setState({ modalVisible: !prev.modalVisible })
    );
  };

  addCalendarItem = () => {
    this.toggleShowModal();
  };

  removeCalenderItem = () => {
    this.toggleShowModal();
  };

  showDetailCalenderItem = () => {
    this.toggleShowModal();
  };

  // 사용자가 셀을 클릭했을 때 나타나는 UI콜백 선언 부분
  dateCellRender = (value: any) => {
    const listData = this.getListData(value);

    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.addCalendarItem}>일정 추가</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.removeCalenderItem}>일정 삭제</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.addCalendarItem}>자세히보기</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click"]}>
        <ul className="events">
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </Dropdown>
    );
  };

  getMonthData = (value: any) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  monthCellRender = (value: any) => {
    const num = this.getMonthData(value);

    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  // 새로운 데이터 입력 핸들러 
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);

      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  onCancle = () => {
    this.toggleShowModal();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "green"
    })(
      <Select style={{ width: 90 }}>
        <Option value="green">보통</Option>
        <Option value="orange">주의</Option>
        <Option value="red">중요</Option>
      </Select>
    );

    return (
      <div
        ref={(ref) => (this.container = ref)}
        className={this.props.className}
      >
        {/* 캘린더 아이템의 추가 삭제를 위한 모달 선언 부분 */}
        <Modal
          visible={this.state.modalVisible}
          centered={true}
          onOk={this.onSubmit}
          onCancel={this.onCancle}
          closable={false}
          maskClosable={false}
        >
          <Form>
            <FormItem label="내용을 입력해주세요">
              {getFieldDecorator("content", {
                rules: [{ required: true, message: "내용을 입력해주세요" }]
              })(
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              )}
            </FormItem>
          </Form>
        </Modal>

        {/* 실제 캘린더 인스턴스 from antd */}
        <Calendar
          fullscreen={this.state.fullscreen}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
        />
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(MyCalendar);

const styledCalendar = styled(WrappedRegistrationForm)`
  overflow-y: scroll;

  ul.events {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
`;

export { styledCalendar as Calendar };
