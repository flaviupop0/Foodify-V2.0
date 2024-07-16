import React from 'react';
import {TouchableOpacity} from 'react-native';
import propTypes from 'prop-types';
import style from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BackButton = props => {
  return (
    <TouchableOpacity style={style.container} onPress={() => props.onPress()}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: propTypes.func.isRequired,
};

export default BackButton;
