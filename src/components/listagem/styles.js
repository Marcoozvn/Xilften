import styled, { keyframes } from 'styled-components';

export const Dash = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #01A9DB;
  color: #fff;
  padding: 10px;
`;

export const Load = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: black;
  color: #fff;
  font-weight: bold;
  margin: auto;
`;

export const FilmList = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 20px;
  background: black;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: black;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 0;
  background: #01A9DB;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    cursor: default;
  }
  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Cardfilm= styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px; 
  border: 1px solid #01A9DB;
  border-radius: 5px;
  width: 300px;
  height: 500px;
  background: url(${props => props.poster});
  background-color: #01A9DB;
  background-repeat: no-repeat;
  header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const AppLogo = styled.img`
  animation: ${rotate360} infinite 10s linear;
  height: ${props => props.height ? props.height : 40}px;
`;