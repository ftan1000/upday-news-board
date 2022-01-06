import '@testing-library/jest-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

jest.mock('./src/withAuthentication', () => () =>
    Component => props => <Component {...props} />
)

configure({ adapter: new Adapter() });
