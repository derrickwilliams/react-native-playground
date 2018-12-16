import React from 'react';
import { Button, Text, Icon } from 'native-base';

const getStyle = (props) => {
    const style = {...props.style};

    if (props.vPad) {
        style.marginVertical = props.vPad;
    }

    return style;
}

export const WideButton = (props) => (
    <Button block bordered onPress={props.onPress} style={getStyle(props)} {...props}>
        <Text>{props.children}</Text>
    </Button>
);

export const HeaderBackButton = (props) => (
    <Button transparent onPress={props.onPress} {...props}>
        <Icon name='ios-arrow-back' />
    </Button>
)
