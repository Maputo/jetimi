import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const styles = (theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class TransitionalModal extends React.Component {
  render() {
    const { children, classes, open, onClose } = this.props;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {children}
          </div>
        </Fade>
      </Modal>
    );
  }
}

export default withStyles(styles)(TransitionalModal);

TransitionalModal.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

TransitionalModal.defaultProps = {
  open: false,
};
