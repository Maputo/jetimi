import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FiltersAndChipsContainer from '../../containers/FiltersAndChipsContainer.jsx';
import BottomAppBar from '../../components/molecules/BottomAppBar.jsx';
import CustomTable from '../../components/atoms/CustomTable.jsx';
import Filler from '../../components/atoms/Filler.jsx';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../../utils/DefaultProps.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ProtegesPage = (props) => {
  const classes = useStyles();
  const { proteges = [], history } = props;

  const handleRowClick = (row) => {
    history.push(`/p/${row.id}`);
  };

  const bottomBarAddClick = () => {
    history.push('/p/new');
  };

  return (
    <div className={classes.root}>
      <FiltersAndChipsContainer />
      <CustomTable entries={proteges} onRowClick={handleRowClick} />
      <Filler />
      <BottomAppBar onAdd={bottomBarAddClick} />
    </div>
  );
};

ProtegesPage.propTypes = {
  history: PropTypes.object,
  proteges: PropTypes.array,
};

ProtegesPage.defaultProps = {
  history: EMPTY_OBJECT,
  proteges: EMPTY_ARRAY,
};

export default withRouter(ProtegesPage);
