import { useEffect, useState } from "react";
import styled from "styled-components";
import CoinList from "./CoinList.tsx";
import CoinDetail from "./CoinDetail.tsx";

export type CoinType = {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  market_cap_usd: string;
  volume24: string;
};

type ApiResponseType = {
  data: CoinType[];
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: calc(100vh - 150px);
`;

export default function CoinPage() {
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<CoinType | null>(null);
  useEffect(() => {
    fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
      .then(r => r.json())
      .then((json: ApiResponseType) => {
        setCoins(json.data);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <CoinList
        coins={coins}
        loading={loading}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />

      <CoinDetail selectedCoin={selectedCoin} />
    </Container>
  );
}
