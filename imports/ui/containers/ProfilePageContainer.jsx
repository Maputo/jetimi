import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router';
import ProfilePage from '../pages/Protege/ProfilePage.jsx';
import { EMPTY_OBJECT } from '../../../utils/DefaultProps.js';

const protegesSingle = new Meteor.Collection('protegesSingle');

const convertDate = (date) => {
  const fullYear = date.getFullYear();
  let month = date.getMonth().toString();
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
  Meteor.subscribe('proteges.single');

  const { match } = props;
  const { params = {} } = match;
  const { id } = params;

  const protegesData = protegesSingle.find({ _id: { $eq: id } }).fetch();

  return {
    protege: mapProtegeDataForReact(protegesData),
  };
})(ProfilePage);

export default withRouter(ProfilePageContainer);
