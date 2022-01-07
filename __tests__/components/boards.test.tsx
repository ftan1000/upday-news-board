import React from 'react';
import {shallow} from 'enzyme';
import {Board} from "../../src/api/upday";
import Boards from "../../components/boards";
import {findByTestId} from "../../src/testHelpers";
import {ListItemText} from "@mui/material";

describe('Boards', () => {

  const data: Board[] = [
      { id: 'en', name: 'England' },
      { id: 'de', name: 'Deutsch' },
      { id: 'it', name: 'Italiano' }
      ];

  const emptyData: Board[] = [];

  it('correctly renders ListItemText components when data exists', () => {

    const props = { data };
    const wrapper = shallow(<Boards {...props} />);

    expect(wrapper.find(ListItemText)).toHaveLength(data.length);
    for (let entry of data) {
      expect(findByTestId(wrapper, 'board-ListItemText-'+entry.id).exists()).toBeTruthy();
    }
    expect(findByTestId(wrapper, 'board-nodata-static-msg').exists()).toBeFalsy()
    expect(findByTestId(wrapper, 'board-nodata-error-msg').exists()).toBeFalsy();
  });

  it('renders static error msg when no data is given', () => {
    const wrapper = shallow(<Boards />);

    expect(wrapper.find(ListItemText)).toHaveLength(0);
    expect(findByTestId(wrapper, 'board-nodata-static-msg').exists()).toBeTruthy();
    expect(findByTestId(wrapper, 'board-nodata-error-msg').exists()).toBeFalsy();
  });

  it('renders static error msg when data is empty', () => {

    const props = { emptyData };

    // @ts-ignore
    const wrapper = shallow(<Boards {...props} />);

    expect(wrapper.find(ListItemText)).toHaveLength(0);
    expect(findByTestId(wrapper, 'board-nodata-static-msg').exists()).toBeTruthy();
    expect(findByTestId(wrapper, 'board-nodata-error-msg').exists()).toBeFalsy();
  });

  it('renders static and dynamic message when no data and error message are given', () => {

    const errorMessage = 'some-error-message';
    const props = { errorMessage: errorMessage, hasError:true, data: emptyData };
    const wrapper = shallow(<Boards {...props} />);

    expect(wrapper.find(ListItemText)).toHaveLength(0);
    expect(findByTestId(wrapper, 'board-nodata-static-msg').exists()).toBeTruthy();
    expect(findByTestId(wrapper, 'board-nodata-error-msg').exists()).toBeTruthy();
    expect(wrapper.contains(<pre>{errorMessage}</pre>)).toBeTruthy();
  });

});
