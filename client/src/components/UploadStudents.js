import React from 'react'
import DropZone from 'react-dropzone';
import axios from 'axios'
import {
  Segment,
  Button,
  Icon,
  Header,
 } from 'semantic-ui-react'


class UploadStudents extends React.Component {

  drop = (files) => {
    const file = files[0];
    const data = new FormData();
    data.append('file', file)
    debugger
    axios.post("/api/students", data)
  }

  render () {
    return(

      <Segment>
        <Header>Upload Student Data</Header>
        <DropZone onDrop={this.drop}>
          <Button basic icon labelPosition="left">
            <Icon name="file excel outline" />
            Upload CSV
          </Button>
        </DropZone>
      </Segment>
    )
  }
}

export default UploadStudents;
