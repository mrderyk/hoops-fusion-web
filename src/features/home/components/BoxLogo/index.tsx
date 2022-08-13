import React from "react";
import { BoxLogoBgTile, BoxLogoBgTilesWrapper, BoxLogoTitleWrapper, Title, Wrapper } from "./styled";

const MJ_SHRUG_GIF_URL = 'https://media0.giphy.com/media/l3q2JCu9lep6dAmyY/giphy.gif?cid=ecf05e47ne91k3fs720stv8pfb3sgdu2iymsm9x2b4xzsi13&rid=giphy.gif&ct=g';
const STEPH_RING_GIF_URL = 'https://media0.giphy.com/media/NuxRC8DAnC62qWySWz/giphy.gif?cid=ecf05e47x4zaiv25pj7kgnh78fwssa910evtgh2n1e7u9bpg&rid=giphy.gif&ct=g';
const LARRY_TOWEL_GIF_URL = 'https://media1.giphy.com/media/sQpl7yebgk3Pq/giphy.gif?cid=ecf05e47sg6sobnd7tli3eeg6r2n9yucn9ysbf6h4rlz3qb0&rid=giphy.gif&ct=g';
const LEBRON_BACKBREAK_GIF_URL = 'https://media4.giphy.com/media/bMJqfOtgVEyI2PLnaW/giphy.gif?cid=ecf05e47sm70km2bvjmx2l272fs8drypu0mhfhd6g9atgsly&rid=giphy.gif&ct=g';
const KOBE_HELLO_GIF_URL = 'https://media4.giphy.com/media/3o7TKwBiaPbVVcdIuk/giphy.gif?cid=ecf05e47rfgn261o4r0l1p97s29qlil74bjjuy66z9p1iiob&rid=giphy.gif&ct=g';

export const BoxLogo: React.FC<{}> = () => {
  return (
    <Wrapper>
      <BoxLogoBgTilesWrapper>
        <BoxLogoBgTile src ={LARRY_TOWEL_GIF_URL} />
        <BoxLogoBgTile src ={STEPH_RING_GIF_URL} />
        <BoxLogoBgTile src={MJ_SHRUG_GIF_URL} />
        <BoxLogoBgTile src ={LEBRON_BACKBREAK_GIF_URL} />
        <BoxLogoBgTile src ={KOBE_HELLO_GIF_URL} />
        <BoxLogoBgTile src ={LARRY_TOWEL_GIF_URL} />
        <BoxLogoBgTile src ={STEPH_RING_GIF_URL} />
        <BoxLogoBgTile src={MJ_SHRUG_GIF_URL} />
        <BoxLogoBgTile src ={LEBRON_BACKBREAK_GIF_URL} />
        <BoxLogoBgTile src ={KOBE_HELLO_GIF_URL} />
        <BoxLogoBgTile src ={LARRY_TOWEL_GIF_URL} />
        <BoxLogoBgTile src ={STEPH_RING_GIF_URL} />
        <BoxLogoBgTile src={MJ_SHRUG_GIF_URL} />
        <BoxLogoBgTile src ={LEBRON_BACKBREAK_GIF_URL} />
        <BoxLogoBgTile src ={KOBE_HELLO_GIF_URL} />
      </BoxLogoBgTilesWrapper>
      <BoxLogoTitleWrapper>
        <Title>{'HOOPS FUSION'}</Title>
      </BoxLogoTitleWrapper>
    </Wrapper>
  )
}