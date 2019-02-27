import styled from "styled-components";
import { media } from "style/style-utils";

const FullWidthContainer = styled.div`
  ${media.mdScreen`
    margin-left: calc((100% - 100vw)/2);
    margin-right: calc((100% - 100vw)/2);
  `}
`;

export default FullWidthContainer;
