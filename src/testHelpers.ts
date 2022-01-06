import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { HTMLAttributes } from 'react';

export const findByTestId = (wrapper: ShallowWrapper | ReactWrapper, testId: string): ReactWrapper<HTMLAttributes<any>, any> | ShallowWrapper<HTMLAttributes<any>, any> => {
  return wrapper.find(`[data-testid="${testId}"]`);
};
