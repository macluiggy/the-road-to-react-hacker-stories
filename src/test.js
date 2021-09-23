const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const getUrl = searchTerm =>`${API_BASE}${API_SEARCH}${PARAM_SEARCH}${searchTerm}&page=0`;

let url = getUrl('react')

const extractSearchTerm = url =>
    {return url
          .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
          .replace(PARAM_SEARCH, '')}

console.log(extractSearchTerm('https://hn.algolia.com/api/v1/search?query=react&page=0'))

const extractSearchTerm2 = url =>
    {return url
          .match(/(?=\?).*(?=&)$/g)}

console.log(extractSearchTerm2('https://hn.algolia.com/api/v1/search?query=react&page=0'))