import styled from 'styled-components';

export const MenuItemContainer = styled.div`
  height: ${({ size }) => (size ? '380px' : '240px')};
  min-width: 30%;
  overflow: hidden; // make sure the scale effect on hover won't overflow out of box
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;

  &:hover {
    cursor: pointer;

    & .background-image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & .content {
      opacity: 0.9;
    }
  }

  // indicates the first child of .menu-item
  // takes no effect here, because it's the same as the margin set in .menu-item
  &:first-child {
    margin-right: 7.5px;
  }

  // indicates the last child of .menu-item
  // takes no effect here, because it's the same as the margin set in .menu-item
  &:last-child {
    margin-right: 7.5px;
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

export const ContentContainer = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute; // make sure content to be in the center of bg image instead of next to it

  h1 {
    font-weight: bold; // it's also used by .h1, so maybe actually it's not necessary
    margin-bottom: 6px; // make bottom smaller to make the gap in between smaller
    font-size: 22px;
    color: #4a4a4a;
  }

  span {
    font-weight: lighter;
    font-size: 16px; // not working as it was 16px already
  }
`;
