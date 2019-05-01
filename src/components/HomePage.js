import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getData } from '../actions/crops';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(getData())
  }
  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return (<Typography component="h3" variant="h1" gutterBottom>
        Loading
  </Typography>)
    }

    const { user } = this.props
    return (
      <div className={classes.root}>
        <h2>
          {user.Name}
        </h2>
        <label>{user.Title}</label>
        <h3>Regions</h3>
        <ul>
          {
            user.Regions.map((r, idx) => {
              return (
                <li key={idx}>
                  <Link component={RouterLink} to={`/regions/{${r.id}}`}>
                    {r.RegionName}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.crops.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
