import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

describe('List component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const cardArray = [{id: "0", title: "test card", content: "lorem ipsum"}];
        ReactDOM.render(<List key={0} header='test' cards={cardArray}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
    it('renders the UI as expected', () => {
        const cardArray = [{id: "0", title: "test card", content: "lorem ipsum"}];
        const tree = renderer
            .create(<List key={0} header='test' cards={cardArray} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
