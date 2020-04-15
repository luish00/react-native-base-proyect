import React from 'react';
import { useDispatch } from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import { logOut } from '../../actions';
import I18n from '../../i18n';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const { t } = I18n;

  function onLogOut() {
    dispatch(logOut());
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={t('homeScreen.logOut')}
        onPress={onLogOut}
      />
    </DrawerContentScrollView>
  );
};

export { CustomDrawerContent };
