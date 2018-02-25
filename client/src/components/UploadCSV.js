import React from 'react';
import DropZone from 'react-dropzone';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import axios from 'axios';
import DisplayData from './DisplayData'
import { Segment, Button, Icon, Header } from 'semantic-ui-react';

const styles = {
  drop: { height: 0, marginLeft: '5px' },
  container: { height: '110px', textAlign: 'center' }
};

class UploadCSV extends React.Component {
  state = { loaded: false };

  drop = files => {
    const file = files[0];
    const data = new FormData();
    data.append('file', file);
    this.postToServer(data)
  };

  postToServer = data => {
    const { route, dispatch } = this.props;
    axios
      .post(`/api/${route}/mass_upload?route=${route}`, data)
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
    const { loaded } = this.state
    const routeText = route.charAt(0).toUpperCase() + route.slice(1);
    return (
      <Segment basic>
        <Segment style={styles.container}>
          <Header>Upload { routeText } Data</Header>
          <DropZone accept={'.csv'} style={styles.drop} onDrop={this.drop}>
            <Button basic icon labelPosition="left">
              <Icon name="file excel outline" />
              Upload { routeText } CSV
            </Button>
          </DropZone>
        </Segment>
        <Segment basic>
          { loaded && <DisplayData route={route}/> }
        </Segment>
      </Segment>
    );
  }
}

export default connect()(UploadCSV);
