import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
import UploadStudents from './UploadStudents'
import Flash from './Flash'

class App extends Component {
  render() {
    return (
      <Segment basic>
        <Flash />
        <UploadStudents />
      </Segment>
    );
  }
}

export default App;
