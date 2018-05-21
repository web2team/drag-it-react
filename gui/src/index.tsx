import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";

render(<App />, document.getElementById("app"));
render(<div>"hihi"</div>, document.getElementById("app2"));
