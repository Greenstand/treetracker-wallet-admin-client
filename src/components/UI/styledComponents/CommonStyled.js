import styled from "@emotion/styled";

export const FlexDiv = styled("div")(
  ({
    flexDirection = "row",
    alignItems = "center",
    justifyContent = "center",
  }) => ({
    display: "flex",
    flexDirection: flexDirection,
    alignItems: alignItems,
    justifyContent: justifyContent,
  })
);
