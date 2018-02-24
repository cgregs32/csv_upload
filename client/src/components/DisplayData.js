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
        debugger
        this.setState({ loaded: true, data: res.data })
      })
      .catch(err => {
        //handle error
    })
  }

  // createTableRows = () => {
  //   this.state.data.map(row => {
  //     return(
  //       <Table.Row>
  //         <Table.Cell>{data.name}</Table.Cell>
  //         <Table.Cell as={CellSelection}>{data.email}</Table.Cell>
  //         <Table.Cell as={CellSelection}>{data.phone}</Table.Cell>
  //       </Table.Row>
  //     )
  //   })
  // }

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
              <Table.HeaderCell >Course</Table.HeaderCell>
              <Table.HeaderCell >
                <Header as='h2'>Email Address</Header>
                placeholder
              </Table.HeaderCell>
              <Table.HeaderCell >
                <Header as='h2'>Phone Number</Header>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          { loaded && this.createTableRows(data) }


          <Table.Body>

          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default DisplayData;
