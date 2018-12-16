import React, { Component } from 'react';
import { PhotosEmptyState } from '../';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Body,
    Icon,
    Text
} from 'native-base';

export default class PhotoListScreen extends Component {
    static defaultProps = {
        onNavBack: () => undefined,
        photos: []
    }

    constructor(props) {
        super(props);

        this.state = {}
    }

    render = () => {
        const { photos } = this.props;

        if (photos.length === 0) {
            return <PhotosEmptyState />
        }

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.onNavBack}>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Photo File List</Title>
                    </Body>
                </Header>
                <Content>

                </Content>
            </Container>
        );
    };
}
