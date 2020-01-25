import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router';
import ProfilePage from '../pages/Protege/ProfilePage.jsx';
import { EMPTY_OBJECT } from '../../../utils/DefaultProps.js';
import { update } from '../../api/proteges/methods.js';
import { ProtegesAggregate } from '../../api/collections.js';

const updateProfile = (id, obj) => {
  update.call({ id, ...obj }, (err) => {
    if (err) {
      // log error or whatever
    } else {
      // success
    }
  });
};

const convertDate = (date) => {
  const fullYear = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  month = month.length < 2 ? `0${month}` : month;
  day = day.length < 2 ? `0${day}` : day;

  return `${fullYear}-${month}-${day}`;
};

const mapProtegeDataForReact = (proteges = []) => {
  if (proteges.length > 0) {
    const protege = proteges[0];

    return ({
      id: protege._id,
      name: protege.name,
      dateOfBirth: convertDate(protege.dateOfBirth),
      joinDate: convertDate(protege.joinDate),
      address: protege.address && protege.address.name,
      town: protege.town && protege.town.name,
      sponsor: protege.sponsor ? 'Da' : 'Ne',
      situation: protege.situation,
      text: protege.text,
      gender: protege.gender,
    });
  }

  return EMPTY_OBJECT;
};

const ProfilePageContainer = withTracker((props) => {
  const publicHandle = Meteor.subscribe('proteges.aggregate');

  const { match } = props;
  const { params = {} } = match;
  const { id } = params;

  const protegesData = ProtegesAggregate.find({ _id: { $eq: id } }).fetch();

  return {
    protege: mapProtegeDataForReact(protegesData),
    onUpdate: updateProfile,
    loading: !publicHandle.ready(),
  };
})(ProfilePage);

export default withRouter(ProfilePageContainer);
