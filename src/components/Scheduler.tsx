import { Calendar, Badge } from "antd";
import * as React from "react";
import "./Scheduler.less";

function getListData(value) {
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
      listData = [{ type: "success", content: "발표자료 최종본 완성"}];
      break;
    case 25:
      listData = [{ type: "warning", content: "캡스톤 발표" }];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

export default (
  <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
);
