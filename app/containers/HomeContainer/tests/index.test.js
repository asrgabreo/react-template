/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchItuneArts={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItuneArts on empty change', async () => {
    const getItuneArtsSpy = jest.fn();
    const clearItuneArtsSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearItuneArts={clearItuneArtsSpy} dispatchItuneArts={getItuneArtsSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItuneArtsSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItuneArtsSpy).toBeCalled();
  });

  it('should call dispatchItuneArts on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchItuneArts={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some art' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
