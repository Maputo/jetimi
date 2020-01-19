import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';

/**
 * Prevents scrolling of content behind the backdrop.
 */
export default class BackdropIosWorkaround extends React.PureComponent {
  onTouchMove(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Backdrop {...this.props} onTouchMove={this.onTouchMove} />
    );
  }
}
