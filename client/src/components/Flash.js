import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../actions/flash';
import { Message, Container, Header } from 'semantic-ui-react';

const fadeFlash = dispatch => {
  setTimeout(() => {
    dispatch(clearFlash());
  }, 5000);
};

const displayMessages = messages => (
  <ul>{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>
);

const Flash = ({ flash, dispatch }) => {
  if (flash.message) {
    return (
      <Container>
        <Message onDismiss={() => dispatch(clearFlash())} color={flash.color}>
          <Header as="h5" textAlign="left">
            {Array.isArray(flash.message)
              ? displayMessages(flash.message)
              : flash.message}
          </Header>
          {fadeFlash(dispatch)}
        </Message>
      </Container>
    );
  }
  return null;
};

const mapStateToProps = state => {
  const { flash } = state;
  return { flash };
};

export default connect(mapStateToProps)(Flash);
