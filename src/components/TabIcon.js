import React, {
  PropTypes,
} from 'react';
import {
  Text,
} from 'react-native';
import { Icon } from 'native-base'
const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <Text
    style={{ color: props.selected ? 'red' : 'black' }}
  >
    {props.title}
  </Text>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
