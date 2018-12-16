import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SCREENS } from './src/components/screens';
import LandingScreen from './src/components/screens/LandingScreen';
import PhotoListScreen from './src/components/screens/PhotoListScreen';
import PhotoGridScreen from './src/components/screens/PhotoGridScreen';
import PhotoFileListScreen from './src/components/screens/PhotoFileListScreen';
import { getGalleryData } from './src/data';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nav: {
                currentScreen: SCREENS.PHOTO_FILE_LIST
            },
            highlightedPhoto: null,
            photoList: []
        };
    }

    componentDidMount = () => {
        getGalleryData().then(({ data }) => {
            this.setState({ photoList: data });
        });
    };

    handleScreenNav = (toScreen) => {
        const { nav } = this.state;
        const updatedNav = { ...nav, currentScreen: toScreen };

        this.setState({ nav: updatedNav });
    }

    goToLanding = () => {
        this.handleScreenNav(SCREENS.LANDING);
    }

    render = () => {
        const { photoList, nav } = this.state;
        const { currentScreen } = nav;

        return (
            <View style={{ flex: 1 }}>
                {currentScreen === SCREENS.LANDING &&
                    <LandingScreen onNav={this.handleScreenNav} />
                }

                {currentScreen === SCREENS.PHOTO_LIST &&
                    <PhotoListScreen photos={photoList} onNavBack={this.goToLanding} />
                }

                {currentScreen === SCREENS.PHOTO_GRID &&
                    <PhotoGridScreen photos={photoList} onNavBack={this.goToLanding} />
                }

                {currentScreen === SCREENS.PHOTO_FILE_LIST &&
                    <PhotoFileListScreen photos={photoList} onNavBack={this.goToLanding} />
                }
            </View>
        );
    };
}

const S = StyleSheet.create({});
