import { keyframes } from "styled-components";

export const rotating = keyframes`
    from {
        transform: rotate(0);
        transform-origin: center;
    }
    to {
        transform: rotate(1000deg);
        transform-origin: center;
    }
`

export const pulsing = keyframes`
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.05);
    }
`

export const pageIn = keyframes`
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`

