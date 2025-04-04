import React from 'react';
import {Routes} from '../../navigation/Routes';

const goBack = navigation => {
  navigation.reset({
    index: 1,
    routes: [{name: Routes.LoggedInScreen}, {name: Routes.Settings}],
  });
};

export default goBack;
