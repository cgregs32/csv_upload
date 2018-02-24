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
  state = { loaded: false };

  drop = files => {
    // todo: only allow specific csv per component
    const file = files[0];
    const data = new FormData();
    data.append('file', file);
    this.acceptSpecificFile(file, data);
  };

  acceptSpecificFile = (file, data) => {
    let filePrefix = file.name.split('.')[0];
    if (filePrefix === 'classes') filePrefix = 'courses';
    debugger;
    if (this.props.route === filePrefix) this.postToServer(data);
    this.props.dispatch(
      setFlash([`Can only upload files prefixed: ${filePrefix}`], 'red')
    );
  };

  postToServer = data => {
    const { route, dispatch } = this.props;
    axios
      .post(`/api/${route}`, data)
      .then(res => {
        this.setState({ loaded: true });
        dispatch(setFlash(res.data.message, 'green'));
      })
      .catch(err => {
        dispatch(setFlash(err.response.data.errors, 'red'));
      });
  };

  render() {
    const { route } = this.props
    return (
      <Segment>
        <Header>Upload { route } Data</Header>
        <DropZone accept={'.csv'} style={styles.drop} onDrop={this.drop}>
          <Button basic icon labelPosition="left">
            <Icon name="file excel outline" />
            { route } CSV
          </Button>
        </DropZone>
      </Segment>
    );
  }
}

export default connect()(UploadCSV);
