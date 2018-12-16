import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Body,
    Text
} from 'native-base';
import PhotoView from '@merryjs/photo-viewer';
import { PhotosEmptyState } from '../';
import { HeaderBackButton } from '../base';

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    }
});

const mapPhotosToViewModel = (photos) => photos.map(p => {
    const [title] = p.split('/').splice(-1);
    return {
        source: {
            uri: p
        },
        title
    };
});

const PhotoCell = ({ photo, thumbnailSize, index, onPress }) => {
    return (
        <TouchableOpacity
            key={JSON.stringify(photo.source)}
            style={[thumbnailSize, {}]}
            ref={r => (this.r = r)}
            onPress={() => onPress(photo, index)}>
            <Image style={thumbnailSize} source={photo.source}></Image>
        </TouchableOpacity>
    )
}

export default class PhotoGridScreen extends Component {
    static defaultProps = {
        onNavBack: () => undefined
    }

    constructor(props) {
        super(props);

        const thirdWidth = Dimensions.get('window').width / 3;

        this.thumbnailSize = {
            height: thirdWidth,
            width: thirdWidth
        };

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
        const photoModels = mapPhotosToViewModel(photos);

        if (photoModels.length === 0) {
            return <PhotosEmptyState />
        }

        return (
            <Container>
                <Header>
                    <Left>
                        <HeaderBackButton onPress={this.props.onNavBack} />
                    </Left>
                    <Body>
                        <Title>Photo Viewer (Grid)</Title>
                    </Body>
                </Header>
                <Content>
                    <PhotoView
                        visible={viewerVisible}
                        data={photoModels}
                        hideStatusBar={true}
                        initial={initialView}
                        onDismiss={this.hideViewer}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.gridContainer}>
                            {photoModels.map((p, index) => (
                                <PhotoCell
                                    photo={p}
                                    onPress={this.handlePhotoPressed}
                                    index={index}
                                    key={JSON.stringify(p.source)}
                                    thumbnailSize={this.thumbnailSize}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    };
}
