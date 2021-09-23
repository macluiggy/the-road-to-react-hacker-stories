import styled from 'styled-components';
import { ReactComponent as Check } from '../check.svg';
import { sortBy } from 'lodash';

import React from 'react';

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENT: list => sortBy(list, 'num_comments').reverse(),
    POINT: list => sortBy(list, 'points').reverse(),
}
const List = 
        ({list, onRemoveItem}: listProps) => {
            const [sort, setSort] = React.useState({
                sortKey: 'NONE',
                isReverse: false,
            });

            const handleSort = sortKey => {
                const isReverse = sort.sortKey === sortKey && !sort.isReverse;
                setSort({ sortKey, isReverse });
            }

            const sortFunction = SORTS[sort.sortKey];
            const sortedList = sort.isReverse
                ? sortFunction(list).reverse()
                : sortFunction(list);

            return (console.log('B:list')) || (
                <div>
                    <div style={{ display: 'flex' }}>
                        <span 
                        style={{ width: '40%' }}
                        type='button' onClick={() => handleSort('TITLE')} >
                            <button style={{
                                backgroundColor: sort.sortKey === 'TITLE' ? 'red' : 'white'
                            }} >
                                Title
                            </button>
                        </span>
                        <span 
                        style={{ width: '30%' }}
                        type='button' onClick={() => handleSort('AUTHOR')} >
                            <button style={{
                                backgroundColor: sort.sortKey === 'AUTHOR' ? 'red' : 'white',
                            }} >
                                Author
                            </button>
                        </span>
                        <span 
                        style={{ width: '10%' }}
                        type='button' onClick={() => handleSort('COMMENT')} >
                            <button style={{
                                backgroundColor: sort.sortKey === 'COMMENT' ? 'red' : 'white',
                            }} >
                                Comments
                            </button>
                        </span>
                        <span 
                        style={{ width: '10%' }}
                        type='button' onClick={() => handleSort('POINT')} >
                            <button style={{
                                backgroundColor: sort.sortKey === 'POINT' ? 'red' : 'white',
                            }} >
                                Points
                            </button>
                        </span>
                        <span 
                        style={{ width: '10%' }}>Actions</span>
                    </div>

                    {sortedList.map(item => (
                        <Item 
                            key={item.objectID} 
                            item={item}
                            onRemoveItem={onRemoveItem} 
                        />
                    ))}
                </div>
            )
        }

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




export const Item = ({ item, onRemoveItem }: listProps) => (
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