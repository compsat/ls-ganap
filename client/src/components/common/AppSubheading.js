import AppText from "components/common/AppText";

const AppSubheading = AppText.extend`
  font-family: "Quatro Sans";
  font-weight: 600;
  ${props => props.caps && "text-transform: uppercase;"}
`;

export default AppSubheading;
