import Box from '@mui/material/Box';
import React from 'react';

export type FeatheredImageProps = {
  width: string;
  height: string;
  url: string;
};
export default function FeatheredImage(props: FeatheredImageProps) {
  return (
    <Box
      sx={{
        width: props.width,
        backgroundSize: 'cover',
        height: props.height ?? 'unset',
        backgroundImage: `url(${props.url})`,
        marginTop: '60px',
        /*boxShadow: `0 0 ${props.fadePx}px ${props.fadePx}px ${props.backgroundColor} inset`*/
        boxShadow: `0 0 5px 10px inset RGBA(180,180,180,0.9),
            0 0 10px 0 inset RGBA(180,180,180),
            25px -15px 0 0 RGBA(180,180,180,0.5),
            50px -30px 0 0 RGBA(180,180,180,0.4),
            75px -45px 0 0 RGBA(180,180,180,0.3)`,
        borderRadius: '3rem',
        /*border: '0.2rem solid RGB(180,180,180)'*/
      }}
    />
  );
}
