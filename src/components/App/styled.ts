import styled from '@emotion/styled';
import { Button } from '@mui/material';
import theme from 'utils/theme';

interface IImageProps {
  small?: boolean;
}

export const Card = styled.div`
  padding: 2em;
  background-color: ${theme.palette.primary.light};
`;

export const Counter = styled(Button)`
  color: black;
  font-weight: bold;
  background-color: deepskyblue;
`;

export const Container = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: lightgray;
`;

export const Image = styled.img<IImageProps>`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  ${({ small }) => small && `
    height: 2em;
  `}
`;

export const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`;
