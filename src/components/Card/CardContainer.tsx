import React, { Component } from "react";
import update from "immutability-helper";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Card from "components/Card/Card";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Chatting } from "components/Chatting";

const style = {
  width: 400
};

class CardContainer extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cards: [
        {
          id: 1,
          text: "Write a cool JS library"
        },
        {
          id: 2,
          text: "Make it generic enough"
        },
        {
          id: 3,
          text: "Write README"
        },
        {
          id: 4,
          text: "Create some examples"
        },
        {
          id: 5,
          text:
            // tslint:disable-next-line:max-line-length
            "Spam in Twitter and IRC to promote it (note that this element is taller than the others)"
        },
        {
          id: 6,
          text: "???"
        },
        {
          id: 7,
          text: "PROFIT"
        }
      ]
    };
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  };

  render() {
    const { cards } = this.state;
    const Exam = () => (
      <Query
        query={gql`
          {
            findAllBooks {
              id
              isbn
              title
              pageCount
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>loading</p>;
          }
          if (error) {
            return <p>error</p>;
          }

          console.log(data);

          return data.findAllBooks.map(({ id, title, pageCount }, idx) => (
            <div key={idx}>
              <p>{`id : ${id} \ntitle: ${title}\n pageCount:${pageCount}`}</p>
              <div>hello world!</div>
            </div>
          ));
        }}
      </Query>
    );

    const ADD_BOOK = gql`
      mutation addBook($title: String!) {
        newBook(author: 1, isbn: "123", title: $title) {
          id
          isbn
          pageCount
          title
        }
      }
    `;

    const AddTodo = () => {
      let input;

      return (
        <Mutation mutation={ADD_BOOK}>
          {(newBook, { data }) => (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  newBook({ variables: { title: input.value } });
                  input.value = "";
                }}
              >
                <input
                  ref={(node) => {
                    input = node;
                  }}
                />
                <button type="submit">Add Todo</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    };

    return (
      <div style={style}>
        <AddTodo />
        <Exam />
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
          />
        ))}
        <Chatting />
      </div>
    );
  }
}

const CardContainerWithContext = DragDropContext(HTML5Backend)(CardContainer);

export { CardContainerWithContext as CardContainer };
