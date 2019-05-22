import PropTypes from 'prop-types';

const numberOrString = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const icon = {
  width: numberOrString,
  height: numberOrString,
  fill: PropTypes.string,
  style: PropTypes.object,
  margin: PropTypes.string,
  marginTop: numberOrString,
  marginLeft: numberOrString,
  marginRight: numberOrString,
  marginBottom: numberOrString,
};

const user = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  initials: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
};

export default {
  icon,
  user,
};
