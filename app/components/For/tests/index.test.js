/**
 *
 * Tests for For
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import For from '../index';

describe('<For />', () => {
  it('should render the number of elements passed as props', () => {
    const results = ['a', 'b'];
    const { getAllByTestId } = renderWithIntl(
      <For of={results} renderItem={result => <div data-testid="child">{`result: ${result}`} </div>} />
    );
    expect(getAllByTestId('child').length).toEqual(results.length);
  });

  it('should render the number of elements passed as props and the parent should be a span', () => {
    const results = ['a', 'b'];
    const { getByTestId, getAllByTestId } = renderWithIntl(
      <For
        of={results}
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={result => <div data-testid="child">{`result: ${result}`} </div>}
      />
    );

    expect(getAllByTestId('parent-span').length).toEqual(1);
    expect(getByTestId('parent-span').children.length).toEqual(results.length);
    expect(getAllByTestId('child').length).toEqual(results.length);
  });

  it('should render the number of elements passed as props and should not add another layer of dom nesting', () => {
    const results = ['a', 'b'];
    const { findByTestId, getAllByTestId } = renderWithIntl(
      <For
        of={results}
        noParent
        isRow={false}
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={result => <div data-testid="child">{`result: ${result}`} </div>}
      />
    );

    expect(findByTestId('parent-span')).not.toBe();
    expect(getAllByTestId('child').length).toEqual(results.length);
  });

  it('should not render anything when items is not passed', () => {
    const { findByTestId } = renderWithIntl(
      <For
        noParent
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={result => <div data-testid="child">{`result: ${result}`} </div>}
      />
    );

    expect(findByTestId('parent-span')).not.toBe();

    const rendered = renderWithIntl(
      <For
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={result => <div data-testid="child">{`result: ${result}`} </div>}
      />
    );

    expect(rendered.findByTestId('parent-span')).not.toBe();
  });
});
