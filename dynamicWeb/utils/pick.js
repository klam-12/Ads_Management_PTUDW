import _ from 'lodash';

const pick = (object = {}, pickUps = []) => {
  return _.pick(object, pickUps);
};

export default pick;
