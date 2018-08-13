import * as React from "react";
import { RootRouter } from "routers/RootRouter";
import "./App.less";

export default class App extends React.Component {
  render() {
    return <RootRouter />;
  }
}
