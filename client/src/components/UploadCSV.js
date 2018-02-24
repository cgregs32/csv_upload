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
    // todo: only allow specific csv per component
    const file = files[0];
    const data = new FormData();
    data.append('file', file);
    console.log(files)
    this.postToServer(data)
  };

  postToServer = (data) => {
    const {route, dispatch } = this.props
    axios.post(`/api/${route}`, data)
    .then(res => {
      // successful
      dispatch(setFlash(res.data.message, 'green'));

      console.log(res);
    })
    .catch(err => {
      dispatch(setFlash(err.response.data.errors, 'red'));
    });
  }

  render() {
    return (
      <Segment>
        <Header>Upload {this.props.route} Data</Header>
        <DropZone accept={'.csv'} style={styles.drop} onDrop={this.drop}>
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
