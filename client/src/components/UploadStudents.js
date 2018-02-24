import React from 'react'
import DropZone from 'react-dropzone';
import { setFlash } from '../actions/flash'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Segment,
  Button,
  Icon,
  Header,
 } from 'semantic-ui-react'

const styles = {
 drop: { height: 0, marginLeft: '5px' }
}

class UploadStudents extends React.Component {
  state = {errors: false}

  drop = (files) => {
    const file = files[0];
    const data = new FormData();
    data.append('file', file)
    axios.post("/api/students", data)
      .then(res => {
        // successful
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
        this.props.dispatch(setFlash(err.response.data.errors, 'red'))
      })
  }

  render () {
    return(

      <Segment>
        <Header>Upload Student Data</Header>
        <DropZone style={styles.drop} onDrop={this.drop}>
          <Button basic icon labelPosition="left">
            <Icon name="file excel outline" />
            Upload CSV
          </Button>
        </DropZone>
      </Segment>
    )
  }
}

export default connect()(UploadStudents);
