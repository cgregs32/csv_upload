import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import UploadStudents from './components/UploadStudents'

class App extends Component {
  render() {
    return (
      <Segment basic>
        <UploadStudents />
      </Segment>
    );
  }
}

export default App;
