import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Body,
    Icon,
} from 'native-base';
import FitImage from 'react-native-fit-image';
import PhotoView from '@merryjs/photo-viewer';
import { PhotosEmptyState } from '../'

const mapPhotosToViewModel = (photos) => photos.map(p => {
    const [title] = p.split('/').splice(-1);
    return {
        source: {
            uri: p
        },
        title
    };
});

export default class PhotoListScreen extends Component {
    static defaultProps = {
        onNavBack: () => undefined
    }

    constructor(props) {
        super(props);

        this.state = {
            viewerVisible: false,
            initialView: 0
        }
    }

    handlePhotoPressed = (photo, index) => {
        this.setState({ viewerVisible: true, initialView: index })
    }

    handleBackPressed = () => {
        this.props.onNavBack();
    }

    hideViewer = () => {
        this.setState({ viewerVisible: false, initialView: 0 })
    }

    render = () => {
        const { viewerVisible, initialView } = this.state;
        const { photos = [] } = this.props;

        if (photos.length === 0) {
            return <PhotosEmptyState />;
        }

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.handleBackPressed}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Photo Viewer (list)</Title>
                    </Body>
                </Header>
                <Content>
                    <PhotoView
                        visible={viewerVisible}
                        data={mapPhotosToViewModel(photos)}
                        hideStatusBar={true}
                        initial={initialView}
                        onDismiss={this.hideViewer}
                    />
                    <FlatList
                        data={photos}
                        extraData={this.props}
                        keyExtractor={(item) => JSON.stringify(item)}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => this.handlePhotoPressed(item, index)}>
                                <FitImage
                                    source={{ uri: item }}
                                    originalHeight={400}
                                    originalWidth={400}
                                    style={{ marginBottom: 5 }}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </Content>
            </Container>
        );
    };
}
