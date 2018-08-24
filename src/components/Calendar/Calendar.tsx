import { Calendar, Badge } from "antd";
import * as React from "react";
import { styled } from "theme";

import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

class MyCalendar extends React.Component<any, any> {
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
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
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
      <Calendar
        className={this.props.className}
        dateCellRender={this.dateCellRender}
        monthCellRender={this.monthCellRender}
        onSelect={(s) => console.log(s)}
      />
    );
  }
}

const styledCalendar = styled(MyCalendar)`
  ul.events {
    list-style: none;
    margin: 0;
    padding: 0;
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
