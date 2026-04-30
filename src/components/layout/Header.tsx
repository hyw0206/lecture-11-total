import styled, { useTheme } from "styled-components";
import {
  FaBitcoin,
  FaBook,
  FaClipboardList,
  FaFilm,
  FaHome,
  FaMoon,
  FaRocket,
  FaSpaceShuttle,
  FaSun,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { type ReactNode, useContext } from "react";
import { ThemeContext } from "../../contexts/theme/ThemeContext.ts";

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background: ${props => props.theme.colors.background.paper};
  border-bottom: 1px solid ${props => props.theme.colors.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${props => props.theme.colors.text.default};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 8px;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 800;
  background: ${props =>
    props.$isActive ? props.theme.colors.info : props.theme.colors.background.paper};
  &:hover {
    background: ${props => props.theme.colors.background.default};
  }
`;

const ThemeToggleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 36px;
  gap: 8px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s;
  background: ${props => props.theme.colors.background.default};
  color: ${props => props.theme.colors.text.default};
  border: 1px solid${props => props.theme.colors.divider};

  :hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

type menuType = {
  path: string;
  label: string;
  icon: ReactNode;
};

const menuList: menuType[] = [
  {
    path: "/",
    label: "Home",
    icon: <FaHome size={18} />,
  },
  {
    path: "/todo",
    label: "Todo",
    icon: <FaBook size={18} />,
  },
  {
    path: "/coin",
    label: "Coin",
    icon: <FaBitcoin size={18} />,
  },
  {
    path: "movie",
    label: "Movie",
    icon: <FaFilm size={18} />,
  },
  {
    path: "/board",
    label: "Board",
    icon: <FaClipboardList size={18} />,
  },
  {
    path: "rocket",
    label: "Rocket",
    icon: <FaRocket size={18} />,
  },
  {
    path: "/book",
    label: "Book",
    icon: <FaBook size={18} />,
  },
];

export default function Header() {
  const palette = useTheme();

  // useLocation() : 사용자가 현재 위치한 주소 리턴
  // 위치한 주소의 정보가 객체로 리턴
  const { pathname } = useLocation();

  // 우리가 할 거 : 현재 이동한 위치의 NavItem에게 .active 걸어주기!

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <HeaderContainer>
      <Logo>
        <FaSpaceShuttle color={palette.colors.primary} /> My Project
      </Logo>
      <NavMenu>
        {menuList.map((item, idx) => (
          // $를 붙여서 styled-components에서 사용할 수 있도록 해주기
          // 이름이 props가 아니라면 써야 함? ㅇㅇ
          <NavItem
            to={item.path}
            key={idx}
            $isActive={item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)}>
            {item.icon} {item.label}
          </NavItem>
        ))}
      </NavMenu>
      <ThemeToggleButton onClick={toggleTheme}>
        {theme === "light" ? (
          <>
            <FaMoon size={16} />
            다크
          </>
        ) : (
          <>
            <FaSun size={16} /> 라이트
          </>
        )}
      </ThemeToggleButton>
    </HeaderContainer>
  );
}
