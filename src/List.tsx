import styled from 'styled-components';
import { ReactComponent as Check } from './check.svg';

import React from 'react';

const List = 
        ({list, onRemoveItem}: listProps) => (
                    console.log('B:list') ||
                <>
                    {list.map(item => (
                        <Item 
                            key={item.objectID} 
                            item={item}
                            onRemoveItem={onRemoveItem} 
                        />
                    ))}
                </>
        )

const StyledItem = styled.div`
display: flex;
align-items: center;
padding-bottom: 5px;
`;

const StyledColumn = styled.span`
padding: 0 5px;
white-space: nowrap;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
a {
color: red;
}
width: ${props => props.width};
`;




const Item = ({ item, onRemoveItem }: listProps) => (
  <StyledItem>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <StyledColumn width='30%'>{item.author}</StyledColumn>
    <StyledColumn width="10%">{item.num_comments}</StyledColumn>
    <StyledColumn width="10%">{item.points}</StyledColumn>
    <StyledColumn width="10%">
      <button
       type="button"
       onClick={() => onRemoveItem(item)}
       className="button button_small"
      >
        <Check height="18px" width="18px" />
      </button>
    </StyledColumn>
  </StyledItem>
);

export default List;