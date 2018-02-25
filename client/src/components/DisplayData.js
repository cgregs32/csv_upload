import React from 'react';
import axios from 'axios';
import { Segment, Table, Header } from 'semantic-ui-react';

class DisplayData extends React.Component {
  state = { loaded: false, data: [] };

  componentDidMount() {
    const { route } = this.props;
    axios
      .get(`/api/${route}`)
      .then(res => {
        this.setState({ loaded: true, data: res.data });
      })
      .catch(err => {
        //handle error
      });
  }

  configureData = row => {
    let data;
    switch (this.props.route) {
      case 'students':
        data = { option1: row.student_id, option2: row.full_name };
        break;
      case 'courses':
        data = { option1: row.course_id, option2: row.course_name };
        break;
      case 'grades':
        data = {
          option1: row.full_name,
          option2: row.course_name,
          option3: row.grade_code
        };
        break;
      default:
        data = { option1: 'Error', option2: 'Error' };
    }
    return data;
  };

  createTableRows = data => {
    return data.map((row, i) => {
      let data = this.configureData(row);
      return (
        <Table.Row key={i}>
          <Table.Cell>{data.option1}</Table.Cell>
          <Table.Cell>{data.option2}</Table.Cell>
          {data.option3 && <Table.Cell>{data.option3}</Table.Cell>}
        </Table.Row>
      );
    });
  };

  normalizeHeaders = route => {
    let headers;
    switch (route) {
      case 'students':
        headers = { option1: 'Student Id', option2: 'Full Name' };
        break;
      case 'courses':
        headers = { option1: 'Course Id', option2: 'Course Name' };
        break;
      case 'grades':
        headers = {
          option1: 'Student Name',
          option2: 'Course Name',
          option3: 'Grade'
        };
        break;
      default:
        headers = { option1: 'Error', option2: 'Error' };
    }
    return headers;
  };

  render() {
    let { route } = this.props;
    const { data, loaded } = this.state;
    const headers = this.normalizeHeaders(route);
    const routeText = route.charAt(0).toUpperCase() + route.slice(1);
    return (
      <Segment>
        <Header as="h2">{routeText} Data</Header>
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{headers.option1}</Table.HeaderCell>
              <Table.HeaderCell>{headers.option2}</Table.HeaderCell>
              {route === 'grades' && (
                <Table.HeaderCell>{headers.option3}</Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Header>
          <Table.Body>{loaded && this.createTableRows(data)}</Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default DisplayData;
