import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          University of Ruhuna
        </Typography>
        <Typography color={medium}>Alumina DCS</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Matara</Typography>
      </FlexBetween>

      <Typography color={medium} m="0.5rem 0">
      The University of Ruhuna is a public university in Matara, Sri Lanka.
       It is the only university in the southern region of Sri Lanka. 
       It was established by a special presidential decree on 
       1 September 1978 as Ruhuna University College and upgraded to a full-fledged university on 
       1 February 1984 by a university order
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;