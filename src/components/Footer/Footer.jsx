// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//     return (
//         <section className="main-footer">
//             <div className="wrapper-group">
//                 <div className="widget">
//                     <p><img src="https://demos.promola.co.za/wipcast/wp-content/uploads/sites/6/2020/05/wipcast-logo.png" alt="logo" /></p>
//                     <p className="widget-text">WipCast is a responsive podcast/blogging theme by Promola, arcu elementum aliquam. At sem sed arcu elementum aliquam. Curabitur non ligula auctor, hendrerit dui non, aliquet turpis.</p>
//                     <ul className="info-widget">
//                         <li>1</li>
//                         <li>2</li>
//                         <li>3</li>
//                         <li>4</li>
//                         <li>5</li>
//                     </ul>
//                 </div>
//                 <div className="widget">
//                     <div className="section-heading">
//                         <h4>From the blog</h4>
//                     </div>
//                     <article className="post">
//                         <div className="post-thumb">
//                             <img src="https://journication.de/aii/width=760/wp-content/uploads/sites/110/2020/04/ohrid-north-macedonia-nordmazedonien-travel-tips-city-trip-sehenswuerdigkeiten-church-holy-kapelle-orthodox-kaneo-famous-panoramic-panorama-mountains-120x120.jpg.webp" alt="" />
//                         </div>
//                         <div className="post-content">
//                             <p className="post-date">April 23, 2021</p>
//                             <p className="post-title">Going On A Road Trip Across The USA</p>
//                             <button className="post-btn">World</button>
//                         </div>
//                     </article>
//                 </div>
//                 <div className="widget">
//                     <div className="section-heading">
//                         <h4>Our Newsletter</h4>
//                     </div>

//                 </div>
//             </div>
//             <div className="footer-copyright">
//                 Copyright 2021, Privacy Police
//             </div>
//         </section>
//     );
// }

// export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#0d47a1",
    color:  "#eceff1",
    padding: theme.spacing(6, 0),
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default Footer;