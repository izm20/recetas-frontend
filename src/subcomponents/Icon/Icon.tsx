import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';

const Container = styled.div<any>`
  width: ${(props) => (props.size ? props.size + ';' : '24px;')};
  height: ${(props) => (props.size ? props.size + ';' : '24px;')};
  //min-width: 24px;
  //height: 2em;
  //min-height: 24px;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  :hover {
    cursor: pointer;
  }
`;

interface IconProps {
  src: string;
  active_src?: string;
  size?: string;
  handleClicks?: (isActive: boolean) => void;
  isActive?: boolean;
}

export const Icon: FC<IconProps> = (props) => {
  const [active, setActive] = useState(props.isActive);
  const [image, setImage] = useState(active ? props.active_src : props.src);
  const changeIcon = () => {
    if (props.active_src) {
      if (!active) {
        setImage(props.active_src);
      } else {
        setImage(props.src);
      }
    }
  };

    const handleClick = (event: any) => {
      event.preventDefault();
      changeIcon();
      props.handleClicks?.(!active);
      setActive(!active);
  };

  return <Container src={image} onClick={handleClick} size={props.size}/>;
};
