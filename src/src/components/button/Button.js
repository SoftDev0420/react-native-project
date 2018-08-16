import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import color from '../../statics/colors/index';
import styles from './Button.styles';

const propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  borderColor: PropTypes.string,
  fontSize: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

let { width, height } = {
  width: (Dimensions.get("window").width * 2) / 3,
  height: (Dimensions.get("window").height * 2) / 3
};

const Mywidth = width > height ? width : height;
const Myheight = width > height ? height : width;

const defaultProps = {
  style: {},
  labelColor: color.white,
  iconColor: color.white,
  backgroundColor: 'transparent',
  height: 50,
  //width: "auto",
  alignSelf: 'center',
  borderColor: color.white,
  fontSize: 14,
  disabled: false,
};

const Button = props => {
  const {
    onPress,
    label,
    labelColor,
    icon,
    iconColor,
    backgroundColor,
    height,
    //width,
    alignSelf,
    borderColor,
    fontSize,
    loading,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[
        styles.touchable,
        {
          height: height,
         // width: width,
          alignSelf:alignSelf,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        props.style,
      ]}
    >
      {icon && <Icon size={24} name={icon} color={iconColor} />}
      {!loading && (
        <Text
          style={[
            styles.text,
            {
              color: labelColor,
              fontSize: fontSize,
            },
          ]}
        >
          {label}
        </Text>
      )}
      {loading && (
        <ActivityIndicator color="white"/>
      )}
    </TouchableOpacity>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
