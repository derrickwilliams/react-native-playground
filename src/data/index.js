const SERVER_ROOT = 'http://28ee072f.ngrok.io';
const getUrl = (path) => `${SERVER_ROOT}/${path}`;

export const getGalleryData = () => {
    return fetch(getUrl('gallery-data'))
        .then(({ _bodyInit }) => {
            return JSON.parse(_bodyInit)
        })
        .then(list => {
            return list.map(item => {
                const parts = item.split('gal');
                const uri = parts[1].slice(1);
                return getUrl(uri);
            });
        })
        .then(list => {
            return { data: list };
        })
        .catch(err => console.error(err));
};
