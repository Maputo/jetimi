import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
  },
});

const useStylesCard = makeStyles(theme => ({
  card: {
    minWidth: 350,
    margin: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function SimpleCard() {
  const classes = useStylesCard();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom align="right">
          Osnovni podaci
        </Typography>
        <Typography variant="h5" component="h2">
          be
          {bull}
          nev
          {bull}o{bull}
          lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card >
  );
}

export default function Profile() {
  const classes = useStyles();

  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Avatar alt="Jetimi Sandzaka" src="/logo.jpg" className={classes.bigAvatar} />
      </Grid>
      <Grid container justify="center" alignItems="center">
        <h2>Jetimi Sandzaka</h2>
      </Grid>
      <Grid container justify="center" alignItems="center">
        {SimpleCard()}
        {SimpleCard()}
      </Grid>
    </div>
  );
}