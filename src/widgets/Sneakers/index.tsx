import axios from 'axios';
import { useEffect, useState } from 'react';
import { SneakerList, SneakerName, SneakerPrice, SneakerWrapper, ViewMoreLink } from './styled';

interface SneakersProps {
  sneakerTokens: string[];
}

interface SneakerApiDetails {
  data: {
    image_url: string;
    retail_price_cents: number;
    lowest_price_cents: number;
    slug: string;
  };
  value: string;
}

const GOAT_URL_BASE = 'https://www.goat.com/sneakers/';
const GOAT_SEARCH_URL_BASE = 'https://www.goat.com/search?query=';

export const Sneakers: React.FC<SneakersProps> = ({ sneakerTokens }) => {
  const [sneakerDetails, setSneakerDetails] = useState<SneakerApiDetails[]|null>(null);

  useEffect(() => {
    const getSneakerResults = async () => {
      const response = await axios.get(`/api/sneakers?search=${sneakerTokens[0]}`);
      setSneakerDetails(response.data.results);
    };

    getSneakerResults();
  }, [sneakerTokens]);
  
  return (
    <div>
      <SneakerList>
      {
        sneakerDetails?.map((sneakerDetail: SneakerApiDetails) => (
          <Sneaker
            name={sneakerDetail.value}
            imgUrl={sneakerDetail.data.image_url}
            price={sneakerDetail.data.lowest_price_cents}
            slug={sneakerDetail.data.slug}
          />
        ))
      }
      </SneakerList>
      {
        sneakerTokens &&
        <ViewMoreLink href={`${GOAT_SEARCH_URL_BASE}${sneakerTokens[0]}`} target="_blank">
          View More on GOAT.com
        </ViewMoreLink>
      }
      
    </div>
  );
};

interface SneakerProps {
  name: string;
  imgUrl: string;
  price: number;
  slug: string;
};

export const Sneaker: React.FC<SneakerProps> = ({ name, imgUrl, price, slug }) => {
  const sneakerNameParts = name.replace(/'$/, '').split('\'');
  return (
    <a href={`${GOAT_URL_BASE}${slug}`} target="_blank">
      <SneakerWrapper imgUrl={imgUrl}>
        <SneakerName>
          <div>{sneakerNameParts[0]}</div>
          <div>{sneakerNameParts[1]}</div>
          {
            sneakerNameParts.length === 3 &&
            <div>{sneakerNameParts[2]}</div>
          }
        </SneakerName>
        <SneakerPrice>
          <div>AS LOW AS</div>
          <div>${price/100}.00</div>
        </SneakerPrice>
      </SneakerWrapper>
    </a>
  )
};