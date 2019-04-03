import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import { GET_NOTE } from "../../queries";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

const ButtonContainer = styled.div``;

const Button = styled.button`
  background-color: #3486db;
  color: white;
  padding: 7px;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.6);
  transition: opacity 0.2s ease-in-out;
  :first-child {
    margin-right: 10px;
  }
  :nth-child(2) {
    background-color: red;
  }
`;

export default class Note extends React.Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data }) =>
          data.note ? (
            <>
              <TitleComponent>
                <Title>{data.note && data.note.title}</Title>
                <ButtonContainer>
                  <Link to={`/edit/${data.note.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button>Delete</Button>
                </ButtonContainer>
              </TitleComponent>
              <MarkdownRenderer markdown={data.note.content} />
            </>
          ) : null
        }
      </Query>
    );
  }
}
