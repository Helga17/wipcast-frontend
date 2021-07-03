import React from 'react';
import clsx from 'clsx';
import { Container, Grid, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 340,
  },
  list: {
    marginTop: 20
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, est. Quasi, rem! Eaque in, optio sed autem ipsum atque cum?
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, est. Quasi, rem! Eaque in, optio sed autem ipsum atque cum?
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, est. Quasi, rem! Eaque in, optio sed autem ipsum atque cum?
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;