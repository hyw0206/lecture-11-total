import type { CoinType } from "./CoinPage.tsx";
import type { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaArrowDown, FaArrowUp, FaBitcoin } from "react-icons/fa";

const ListSection = styled.aside`
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background.default};
  border: 1px solid ${props => props.theme.colors.divider};
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  font-size: 18px;
  font-weight: 800;
  color: ${props => props.theme.colors.text.default};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.colors.text.disabled};
`;

const CoinUl = styled.ul`
  list-style: none;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${props => props.theme.colors.divider};
  }
`;

const CoinLi = styled.li<{ $isSelected: boolean }>`
  padding: 15px 20px;
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  background-color: ${props =>
    props.$isSelected ? props.theme.colors.background.default : "transparent"};

  border-left: 4px solid
    ${props => (props.$isSelected ? props.theme.colors.primary : "transparent")};
  &:hover {
    background: ${props => props.theme.colors.background.default};
  }
`;
const CoinNameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 16px;
    color: ${props => props.theme.colors.text.default};
  }
  span {
    font-size: 12px;
    color: ${props => props.theme.colors.text.disabled};
  }
`;
const CoinPriceBox = styled.div<{ $isPositive: boolean }>`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 14px;
    color: ${props => props.theme.colors.text.default};
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: ${props => (props.$isPositive ? props.theme.colors.success : props.theme.colors.error)};
  }
`;
type CoinListProps = {
  coins: CoinType[];
  loading: boolean;
  selectedCoin: CoinType | null;
  setSelectedCoin: Dispatch<SetStateAction<CoinType | null>>;
};

export default function CoinList({ coins, loading, selectedCoin, setSelectedCoin }: CoinListProps) {
  return (
    <ListSection>
      <ListHeader>
        <FaBitcoin /> TOP 50 COINS !!!
      </ListHeader>

      {loading ? (
        <LoadingMessage>데이터를 불러오는 중 !!!</LoadingMessage>
      ) : (
        <CoinUl>
          {coins.map((coin, index) => {
            const percentChange = parseFloat(coin.percent_change_24h);
            const isPositive = percentChange > 0;
            return (
              <CoinLi
                key={index}
                $isSelected={selectedCoin?.id === coin.id}
                onClick={() => {
                  setSelectedCoin(coin);
                }}>
                <CoinNameBox>
                  <strong>{coin.name}</strong>
                  <span>{coin.symbol}</span>
                </CoinNameBox>
                <CoinPriceBox $isPositive={isPositive}>
                  <strong>$ {parseFloat(coin.price_usd).toLocaleString()}</strong>
                  <span>
                    {isPositive ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                    {percentChange}%
                  </span>
                </CoinPriceBox>
              </CoinLi>
            );
          })}
        </CoinUl>
      )}
    </ListSection>
  );
}
