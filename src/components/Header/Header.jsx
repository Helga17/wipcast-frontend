import React from 'react';
// import Nav from '../Nav/Nav';
import './Header.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { title } = props;

  const sections = [
    { title: 'Home', url: '/' },
    { title: 'Features', url: '/features' },
    { title: 'Shop', url: '/shop' },
    { title: 'Blog', url: '/blog' },
    { title: 'Picks', url: '/picks' },
    { title: 'World', url: '/world' },
    { title: 'Contact', url: '/contact' }
  ];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default Header;


       // <div className="main-header-wrap">
        //     <div className="main-header">
        //         <div className="wrapper">
        //             <span className="icon">:</span>
        //             <div className="logo-wrap">
        //                 <div className="site-logo">
        //                     <img src="https://demos.promola.co.za/wipcast/wp-content/uploads/sites/6/2020/05/wipcast-logo.png" alt="logo" />
        //                 </div>
        //             </div>
        //             <Nav />
        //             <div className="header-elements">
        //                 <div className="header-social">
        //                     <ul>
        //                         <li><img src="https://image.flaticon.com/icons/png/512/145/145812.png" alt="twitter" /></li>
        //                         <li><img src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png" alt="facebook" /></li>
        //                         <li><img src="https://image.flaticon.com/icons/png/512/174/174855.png" alt="instagram" /></li>
        //                     </ul>
        //                 </div>
        //                 <ul className="elements">
        //                     <li className="header-search"><img src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png" alt="search" /></li>
        //                     <li className="shopping-cart"><img src="https://image.flaticon.com/icons/png/512/263/263142.png" alt="shopping cart" /></li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </div>