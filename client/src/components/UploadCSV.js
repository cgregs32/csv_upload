import React from 'react';
import DropZone from 'react-dropzone';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import axios from 'axios';
import { Segment, Button, Icon, Header } from 'semantic-ui-react';

const styles = {
  drop: { height: 0, marginLeft: '5px' }
};

class UploadCSV extends React.Component {
  state = { errors: false };

  drop = files => {
    const file = files[0];
    const data = new FormData();
    data.append('file', file);
    this.postToServer(data)
  };

  postToServer = (data) => {
    axios.post(`/api/${this.props.route}`, data)
    .then(res => {
      // successful
      console.log(res);
    })
    .catch(err => {
      this.props.dispatch(setFlash(err.response.data.errors, 'red'));
    });
  }

  render() {
    return (
      <Segment>
        <Header>Upload {this.props.route} Data</Header>
        <DropZone style={styles.drop} onDrop={this.drop}>
          <Button basic icon labelPosition="left">
            <Icon name="file excel outline" />
            Upload CSV
          </Button>
        </DropZone>
      </Segment>
    );
  }
}

export default connect()(UploadCSV);
