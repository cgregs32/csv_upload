import React from 'react'
import axios from 'axios'
import {
  Grid,
  Segment,
  Table,
  Header,
  Icon,
  Popup,
} from 'semantic-ui-react';

class DisplayData extends React.Component {
  state = { loaded: false, data: [] }


  componentDidMount(){
    const { route } = this.props
    axios.get(`/api/${route}`)
      .then(res => {
        this.setState({ loaded: true, data: res.data })
      })
      .catch(err => {
        //handle error
    })
  }

  configureData = (row) => {
    let data;
    switch(this.props.route){
      case 'students':
        data = {option1: row.student_id, option2: row.full_name}
        break
      case 'courses':
        data = {option1: row.course_id, option2: row.course_name}
        break
      case 'grades':
        data = {
          option1: row.student_id,
          option2: row.course_name,
          option3: row.student_name,
          option4: row.grade_code
        }
    }
    return data
  }

  createTableRows = () => {
    return this.state.data.map(row => {
      let data = this.configureData(row)
      return(
        <Table.Row>
          <Table.Cell>{ data.option1 }</Table.Cell>
          <Table.Cell>{ data.option2 }</Table.Cell>
          { data.option3 && <Table.Cell>{ data.option3 }</Table.Cell> }
          { data.option4 && <Table.Cell>{ data.option4 }</Table.Cell> }
        </Table.Row>
      )
    })
  }

  normalizeHeaders = () => {
  }

  render () {
    let { route } = this.props
    const { data, loaded } = this.state
    route = route.charAt(0).toUpperCase() + route.slice(1);
    return(
      <Segment>
        <Header as='h2'>{route} Data</Header>
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Data 1</Table.HeaderCell>
              <Table.HeaderCell>Data 2</Table.HeaderCell>
              {route === 'grades' && <Table.HeaderCell>Data 3</Table.HeaderCell>}
              {route === 'grades' && <Table.HeaderCell>Data 4</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>

          { loaded && this.createTableRows()}

          <Table.Body>

          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default DisplayData;
