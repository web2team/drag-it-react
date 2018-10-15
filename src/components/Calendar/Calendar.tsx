import * as React from "react";
import { Calendar, Badge, Dropdown, Menu } from "antd";
const SubMenu = Menu.SubMenu;

import { styled } from "theme";

import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

class MyCalendar extends React.Component<any, any> {
  container: HTMLDivElement;

  state = {
    fullscreen: true
  };

  componentDidUpdate() {
    console.log("update");
  }

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

  dateCellRender = (value: any) => {
    const listData = this.getListData(value);
    const menu = (
      <Menu
        onClick={({ item, key, keyPath }) => console.log(item, key, keyPath)}
      >
        <Menu.Item>일정 추가</Menu.Item>
        <Menu.Item>일정 삭제</Menu.Item>
        <Menu.Item>자세히 보기</Menu.Item>
        <SubMenu title="sub menu">
          <Menu.Item>서브메뉴 1</Menu.Item>
          <Menu.Item>서브메뉴 2</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled={true}>
          <Menu.Item>5d menu item</Menu.Item>
          <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
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

  render() {
    return (
      <div
        ref={(ref) => (this.container = ref)}
        className={this.props.className}
      >
        <Calendar
          fullscreen={this.state.fullscreen}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          // onSelect={this.onSelect}
        />
      </div>
    );
  }
}

const styledCalendar = styled(MyCalendar)`
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