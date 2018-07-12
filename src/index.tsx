import * as React from "react";
import { render } from "react-dom";
import App from "./components/App";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

render(<App/>, document.getElementById("app"));

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql"
});

client.query({
  query: gql`{
      findAllBooks {
          id,
          title,
          pageCount,
          author {
              id
          }
      }
  }
  `
}).then(v => console.log(v));

