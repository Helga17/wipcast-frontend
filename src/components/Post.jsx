import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Post = () => {
  const classes = useStyles();

  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:9001/api/posts/${id}`)
      .then(result => {
        setPost(result.data.post);
      });
  }, [id]);

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
          {post && (
            <Grid item key={post.id} xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={post.image}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography>
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Link to={`/blog/${post.id}`}>
                      <Button size="small" color="primary">
                          View
                      </Button>
                  </Link>
                  <Button size="small" color="primary">
                      Edit
                  </Button> */}
              </CardActions>
            </Card>
        </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Post;