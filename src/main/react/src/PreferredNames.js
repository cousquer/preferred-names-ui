import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import ActionInfo from 'material-ui/svg-icons/action/info-outline';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Material color theme using defined material-ui constants
const muiTheme = getMuiTheme({
  palette: {
    // TODO: Customize colors here
  },
});

// Use for initial DatePicker value and getNames() call
const today = new Date();

class NamesDate extends Component {

  componentWillMount() {
    this.props.updateNames(null, today);
  }

  render() {
    return (
      <DatePicker
        defaultDate={today}
        maxDate={today}
        floatingLabelText="Viewing records for"
        autoOk={true}
        container="inline"
        mode="landscape"
        formatDate={new Intl.DateTimeFormat('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format}
        onChange={this.props.updateNames}
        />
    )
  }
}

class NamesTable extends Component {

  renderTableHeader(header1, header2, header3) {
    return (
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>{header1}</TableHeaderColumn>
          <TableHeaderColumn>{header2}</TableHeaderColumn>
          <TableHeaderColumn><b>{header3}</b></TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
    )
  }

  renderTableBody() {
    return (
      <TableBody
        displayRowCheckbox={false}
        stripedRows={true}>
        {this.props.names.map((row, index) => (
          <TableRow key={index} selectable={false}>
            <TableRowColumn>{this.props.names[index].lastName}</TableRowColumn>
            <TableRowColumn>{this.props.names[index].legalName}</TableRowColumn>
            <TableRowColumn><b>{this.props.names[index].prefName}</b></TableRowColumn>
            <TableRowColumn>{this.renderInfoButton(index)}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  renderInfoButton(index) {
    return (
      <FlatButton
        label="Student Details"
        secondary={true}
        icon={<ActionInfo />}
        onClick={() => this.props.getStudentInformation(
          this.props.names[index].lastName,
          this.props.names[index].legalName
        )}
        />
    )
  }

  render() {
    if (this.props.names.length < 1) {
      // No names changed on the selected date; don't show the table
      return (
        <div>
          <p />
          <Chip>
            <Avatar icon={<ActionInfo />} />
            No records for selected date.
          </Chip>
        </div>
      )
    } else {
      return (
        <div>
          <Table>
            {this.renderTableHeader("Last name", "Legal first name", "Preferred first name")}
            {this.renderTableBody()}
          </Table>
          <p />
        </div>
      )
    }
  }
}

class PreferredNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
    }
  }

  updateNames = (event, date) => {
    // Database request goes here
    // TODO: Remove sample data
    this.setState({
      names: [
        {
          lastName: "Last Name 1",
          legalName: "Legal First Name 1",
          prefName: "Preferred First Name 1",
        },
        {
          lastName: "Last Name 2",
          legalName: "Legal First Name 2",
          prefName: "Preferred First Name 2",
        },
        {
          lastName: "Last Name 3",
          legalName: "Legal First Name 3",
          prefName: "Preferred First Name 3",
        },
      ]
    })
  }

  getStudentInformation(lastName, legalName) {
    // TODO: Pull details for the selected student
    alert("Getting info for "
      + lastName
      + ", "
      + legalName);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NamesDate names={this.state.names} updateNames={this.updateNames} />
          <NamesTable names={this.state.names} getStudentInformation={this.getStudentInformation} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PreferredNames;
