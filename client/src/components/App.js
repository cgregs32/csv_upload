import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import UploadCSV from './UploadCSV';
import Flash from './Flash';

class App extends Component {
  render() {
    return (
      <Segment basic>
        <Flash />
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <UploadCSV route={'students'} />
            </Grid.Column>
            <Grid.Column>
              <UploadCSV route={'courses'} />
            </Grid.Column>
            <Grid.Column>
              <UploadCSV route={'grades'} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default App;
