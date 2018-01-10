import React, { Component } from 'react';
import { NavBar, Icon, Button, List, Switch, Calendar } from 'antd-mobile';

export default (props) => {
  return (
    <NavBar
      mode="light"
    >{props.title}</NavBar>
  );
}
