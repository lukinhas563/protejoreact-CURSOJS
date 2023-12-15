import styled from "styled-components";

export const Title = styled.h1``

export const AlunoContainer = styled.div`
margin-top: 30px;

div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
}

div + div {
    border-top: 1px solid #eee;
}
`

export const FotoContainer = styled.div`
img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
`
