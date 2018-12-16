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
    Card,
    CardItem,
    Text,
    H1,
    H2,
    H3,
    Badge
} from 'native-base';

const mapPhotosToViewModel = (photos) => photos.map(p => {
    debugger
    const [_, path] = p.split('sample-photos');
    const parts = path.split('/');
    const [name] = parts.splice(-1);
    const album = parts.filter(p => p !== "").join('/');

    return {
        name,
        album
    };
});

export default class PhotoFileListScreen extends Component {
    static defaultProps = {
        onNavBack: () => undefined,
        photos: []
    }

    state = {}

    constructor(props) {
        super(props);
    }

    render = () => {
        const { photos } = this.props;

        if (photos.length === 0) {
            return <PhotosEmptyState />
        }

        console.log('list', mapPhotosToViewModel(photos));

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
                    {mapPhotosToViewModel(photos).map(p => (
                        <Card key={p.name}>
                            <CardItem header>
                                <H3>{p.name}</H3>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Badge style={{ backgroundColor: '#c6c6c6' }}>
                                        <Text>album: /{p.album}</Text>
                                    </Badge>
                                </Body>
                            </CardItem>
                        </Card>
                    ))}
                </Content>
            </Container>
        );
    };
}
