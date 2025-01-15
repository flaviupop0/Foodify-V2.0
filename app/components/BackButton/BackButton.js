import React from 'react';
import {TouchableOpacity, Text, SafeAreaView} from 'react-native';
import propTypes from 'prop-types';
import style from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BackButton = props => {
  return (
    <SafeAreaView style={style.bigContainer}>
      <TouchableOpacity style={style.container} onPress={() => props.onPress()}>
        <FontAwesomeIcon icon={faArrowLeft} color={props.color} />
      </TouchableOpacity>
      <Text style={style.title}>{props.title}</Text>
    </SafeAreaView>
  );
};

BackButton.propTypes = {
  onPress: propTypes.func.isRequired,
};

export default BackButton;
