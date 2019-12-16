import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Children from '../../api/children/children.js';
import ChildrenPage from '../pages/Child/ChildrenPage.jsx';

const ChildrenPageContainer = withTracker(() => {
  const publicHandle = Meteor.subscribe('children.public');

  return {
    user: Meteor.user(),
    loading: !publicHandle.ready(),
    connected: Meteor.status().connected,
    children: Children.find({
      userId: { $exists: false },
    }).fetch(),
  };
})(ChildrenPage);

export default ChildrenPageContainer;
