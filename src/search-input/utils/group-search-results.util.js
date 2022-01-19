import { groupBy, orderBy, toPairs } from 'lodash-es';

export function groupSearchResults(searchResults) {
    return orderBy(
        toPairs(groupBy(searchResults, 'item.type')).map(([name, items]) => ({
            id: name,
            name,
            items: orderBy(
                items.map(({ item: { id, author, type } }) => ({
                    id,
                    name: `${id}${author ? ` - by: ${author}` : ''}`
                })),
                'name'
            )
        })),
        ['name']
    );
}
