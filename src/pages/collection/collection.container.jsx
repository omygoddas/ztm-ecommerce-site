import React from 'react';
import Spinner from '../../components/spinner/spinner.component';
import { Query } from 'react-apollo';

import CollectionPage from './collection.component';
import { GET_COLLECTION_BY_TITLE } from "../../graphql/resolvers";

const CollectionsPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collectionId }}
  >
    {({ loading, data }) => {
      if (loading) return <Spinner />;
      const { getCollectionsByTitle } = data;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionsPageContainer;
