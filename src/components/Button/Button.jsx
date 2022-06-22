import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: #adefd1;
  border-radius: 4px;
  border: 0;
  box-sizing: border-box;
  color: #00203f;
  cursor: pointer;
  display: inherit;
  font-family: "Space Grotesk", -apple-system, system-ui, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin: 0;
  min-height: 56px;
  min-width: 120px;
  padding: 14px 14px;
  position: relative;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  transition: all 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);

  :hover {
    background-color: #adefd1;
    transform: translateY(-2px);
  }
`;

export const GeneratorButton = (props) => {
  return (
    <>
      <Button style={props.style} onClick={props.onClick}>
        {props.title}
      </Button>
    </>
  );
};
