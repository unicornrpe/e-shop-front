import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux';

import { loadCustomersData } from '../../../redux/actions/customerActions';

import { customersSelector } from '../../../redux/selectors/customerSelector';

const useStyles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    outerContainer: {
      padding: '30px',
      border: '5px solid black'
    }
  };
};

class CustomerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    document.title = 'Results View - ';
  }

  componentWillMount() {
    const { getCustomers } = this.props;
    getCustomers();
  }

  componentDidUpdate(preProps) {}

  render() {
    const { customers, classes } = this.props;

    return (
      <div className={classes.outerContainer}>
        <Paper style={{ marginBottom: '25px' }}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography variant="h2" style={{ padding: '20px' }}>
              Customers
            </Typography>
          </Grid>
        </Paper>
        <Paper>
          {/* {!customers && <LinearProgress color="secondary" />} */}
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <Typography variant="h5">Name</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h5">Email</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h5">Phone</Typography>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers &&
                    customers.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <Typography variant="h5">{customer.name}</Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Typography variant="h5">{customer.email}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="h5">{customer.phone}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

CustomerList = withStyles(useStyles)(CustomerList);

CustomerList = connect(
  state => ({
    customers: customersSelector(state)
  }),
  dispatch => ({
    getCustomers: () => dispatch(loadCustomersData())
  })
)(CustomerList);

export default CustomerList;
