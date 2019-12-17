import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Proteges from '../../api/proteges/proteges.js';
import ProtegesPage from '../pages/Protege/ProtegesPage.jsx';

const ProtegesPageContainer = withTracker(() => {
  const publicHandle = Meteor.subscribe('proteges.public');

  return {
    user: Meteor.user(),
    loading: !publicHandle.ready(),
    connected: Meteor.status().connected,
    proteges: Proteges.find({
      userId: { $exists: false },
    }).fetch(),
  };
})(ProtegesPage);

export default ProtegesPageContainer;
