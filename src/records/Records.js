import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import 'react-table/react-table.css';

class Records extends Component {

    render() {
        const rows = this.props.content.map((step, move) => {
            return (
                <TableRow key={move} className={step.dir}>
                  <TableRowColumn>{JSON.stringify(step.time)}</TableRowColumn>
                  <TableRowColumn>{JSON.stringify(step.data)}</TableRowColumn>
                </TableRow>
            )
        });

        return (
            <Table selectable={ false }>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Time</TableHeaderColumn>
                  <TableHeaderColumn>Content</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                { rows }
              </TableBody>
            </Table>
        )
    }
}
export default Records;