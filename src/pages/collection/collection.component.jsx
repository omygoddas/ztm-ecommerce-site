import React from 'react';

import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectShopCollection } from '../../redux/shop/shop.selectors';

import {
  CollectionPageContainer,
  TitleContainer,
  ItemContainer,
} from './collection.styles';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <TitleContainer>{title}</TitleContainer>
      <ItemContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ItemContainer>
    </CollectionPageContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectShopCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
