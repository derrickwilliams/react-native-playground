import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    Body,
} from 'native-base';
import { SCREENS } from './';
import { WideButton } from '../base';

export default class LandingScreen extends Component {
    static defaultProps = {
        onNav: () => undefined
    }

    constructor(props) {
        super(props);
    }

    loadScreen = (screen) => {
        const { onNav } = this.props;

        onNav(screen);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                </Header>
                <Content padder>
                    <WideButton vPad={5} onPress={() => this.loadScreen(SCREENS.PHOTO_LIST)}>
                        View Photos (list)
                    </WideButton>
                    <WideButton vPad={5} onPress={() => this.loadScreen(SCREENS.PHOTO_GRID)}>
                        View Photos (grid)
                    </WideButton>
                    <WideButton vPad={5} onPress={() => this.loadScreen(SCREENS.PHOTO_FILE_LIST)}>
                        Photo File List
                    </WideButton>
                    <WideButton vPad={5} onPress={() => console.log('going to screen XYZ')}>
                        Action #3
                    </WideButton>
                    <WideButton vPad={5} onPress={() => console.log('going to screen XYZ')}>
                        Action #4
                    </WideButton>
                    <WideButton vPad={5} onPress={() => console.log('going to screen XYZ')}>
                        Action #5
                    </WideButton>
                    <WideButton vPad={5} onPress={() => console.log('going to screen XYZ')}>
                        Action #6
                    </WideButton>
                </Content>
                <Footer />
            </Container>
        );
    }
}
