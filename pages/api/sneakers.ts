import axios from 'axios';

const SEARCH_URL_BASE = 'https://ac.cnstrc.com/search';
const CIOJS_VERSION = '2.29.2';
const CONSTRUCTOR_IO_KEY = 'key_XT7bjdbvjgECO5d8';
const RESULTS_PER_PAGE = 24;

const buildSearchUrl = (searchTerm: string) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  return `${SEARCH_URL_BASE}/${encodedSearchTerm}?c=ciojs-client-${CIOJS_VERSION}&key=${CONSTRUCTOR_IO_KEY}&num_results_per_page=${RESULTS_PER_PAGE}`;
};

const handler = async (req: any, res: any) => {
  const { search } = req.query;
  const searchUrl = buildSearchUrl(search);
  const response = await axios.get(searchUrl);
  const shoesResults = response.data.response?.results.filter(
    (result: any) => result.data.category === 'shoes'
  );
  res.status(200).json({ results: shoesResults });
}

export default handler;