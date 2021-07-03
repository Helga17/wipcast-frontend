import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { Avatar, ListItemText, Container, Grid, makeStyles, Paper, CardContent, Typography } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PinDropIcon from '@material-ui/icons/PinDrop';
import Divider from '@material-ui/core/Divider';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Chart, PieSeries, Title } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        marginTop: 20,
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
        height: 370,
    },
    small: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    profile: {
        display: 'flex',
    },
    text: {
        marginLeft: 20,
        width: 100,
    },
    cardText: {
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 15,
        marginTop: 10,
        borderBottom: 1,
    },
    caption: {
        width: '70%',
        marginLeft: 15,
        fontSize: 14,
    },
    info: {
        fontSize: 15,
        color: '#757575'
    },
}));

const DashUser = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const chartData = [
        { data: 'post', count: 3 },
        { data: 'podcast', count: 3 },
    ];

    const [user, setUser] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:9001/api/users/${id}`)
            .then(result => {
                setUser(result.data.user);
            });
    }, [id]);


    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4} >
                    {user && (
                    <Paper className={fixedHeightPaper}>
                        <Container xs={12} md={6} lg={4} className={classes.profile}>
                            <Avatar className={classes.small} alt="Cindy Baker" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/daisy-flower-1532449822.jpg" />
                            <ListItemText primary={user.name} className={classes.text} />
                        </Container>
                        <CardContent className={classes.content}>
                            <div className={classes.cardText}>
                                <MailOutlineIcon color="primary" />
                                <Typography className={classes.caption}>Email</Typography>
                                <Typography className={classes.info}>{user.email}</Typography>
                            </div>
                            <Divider />
                            <div className={classes.cardText}>
                                <PinDropIcon color="primary" />
                                <Typography className={classes.caption}>Location</Typography>
                                <Typography className={classes.info}>Ukraine</Typography>
                            </div>
                            <Divider />
                            <div className={classes.cardText}>
                                <PostAddIcon color="primary" />
                                <Typography className={classes.caption}>Posts</Typography>
                                <Typography className={classes.info}>3</Typography>
                            </div>
                            <Divider />
                            <div className={classes.cardText}>
                                <MusicNoteIcon color="primary" />
                                <Typography className={classes.caption}>Podcasts</Typography>
                                <Typography className={classes.info}>3</Typography>
                            </div>
                        </CardContent>
                    </Paper>
                    )} 
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                    <Paper className={fixedHeightPaper}>
                        <Chart data={chartData}>
                            <PieSeries valueField="count" argumentField="data" />
                            <Title text="Pie Chart" />
                            <Animation />
                        </Chart>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default DashUser;