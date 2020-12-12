import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectArtName, selectArtsData, selectArtsError } from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchItuneArts,
  dispatchClearItuneArts,
  intl,
  artsData = {},
  artsError = null,
  artName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(artsData, 'results', null) || artsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [artsData]);

  useEffect(() => {
    if (artName && !artsData?.results?.length) {
      dispatchItuneArts(artName);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = aName => {
    if (!isEmpty(aName)) {
      dispatchItuneArts(aName);
      setLoading(true);
    } else {
      dispatchClearItuneArts();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderArtList = () => {
    const results = get(artsData, 'results', []);
    const resultCount = get(artsData, 'resultCount', 0);
    return (
      (results.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {artName && (
              <div>
                <T id="search_query" values={{ artName }} />
              </div>
            )}
            {resultCount !== 0 && (
              <div>
                <T id="matching_arts" values={{ resultCount }} />
              </div>
            )}
            {results.map((result, index) => (
              <CustomCard key={index}>
                <T id="artist_name" values={{ artistName: result.artistName }} />
                <T id="artist_collection" values={{ collectionName: result.collectionName }} />
                <T id="artist_track" values={{ trackName: result.trackName }} />
                <T id="artist_date" values={{ releaseDate: result.releaseDate }} />
                <T id="artist_genre" values={{ primaryGenreName: result.primaryGenreName }} />
                <T id="artist_track_count" values={{ trackCount: result.trackCount }} />
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let artError;
    if (artsError) {
      artError = artsError;
    } else if (!get(artsData, 'resultCount', 0)) {
      artError = 'art_search_default';
    }
    return (
      !loading &&
      artError && (
        <CustomCard color={artsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'art_list' })}>
          <T id={artError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'art_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_art_details" />
        <Search
          data-testid="search-bar"
          defaultValue={artName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderArtList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItuneArts: PropTypes.func,
  dispatchClearItuneArts: PropTypes.func,
  intl: PropTypes.object,
  artsData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  artsError: PropTypes.object,
  artName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  artsData: selectArtsData(),
  artsError: selectArtsError(),
  artName: selectArtName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItuneArts, clearItuneArts } = homeContainerCreators;
  return {
    dispatchItuneArts: artName => dispatch(requestGetItuneArts(artName)),
    dispatchClearItuneArts: () => dispatch(clearItuneArts())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
