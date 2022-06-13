import React, { useState } from "react";
import styled from "styled-components";
import { AiFillLock } from "react-icons/ai";
import {
  Container,
  HeaderWrapper,
  FormWrapper,
  InputWrapper,
  LengthWrapper,
  ButtonWrapper,
  CheckboxWrapper,
} from "./Layout/index";
import { Button } from "./Button/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const numbers = "0123456789";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const symbols = "0123456789!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

const Header = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #adefd1;
`;

const Label = styled.label`
  margin-right: 5px;
  color: #adefd1;
  font-size: 16px;
`;

const EnterLength = styled.input`
  width: 210px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #0a6bff;
`;
const Generator = styled.textarea`
  width: 400px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #0a6bff;
`;

const RadioButton = styled.input`
  margin-top: 1px;
  width: 12px;
  height: 12px;
`;

const GeneratePassword = () => {
  const [length, setLength] = useState("");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [includeLetters, setIncludeLetters] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = (e) => {
    e.preventDefault();

    const formValid = length > 0;
    if (!formValid) {
      return;
    }
    let characterList = "";

    if (includeLetters) {
      characterList = characterList + letters;
    }
    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    if (includeSymbols) {
      characterList = characterList + symbols;
    }
    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = "";

    const characterListLength = characterList.length;

    for (var i = 0; i < length; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const successToast = () => {
    toast.success("Copied", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const errorToast = () => {
    if (length > 0 && !includeLetters && !includeNumbers && !includeSymbols) {
      toast.error("You must select at least one option", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Container>
        <HeaderWrapper>
          <Header>Random Password Generator</Header>
        </HeaderWrapper>
        <FormWrapper>
          <form onSubmit={handleGeneratePassword}>
            <InputWrapper>
              <LengthWrapper>
                <Label>Choose Password Length: </Label>
                <EnterLength
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Ex: 18"
                  type="text"
                />
              </LengthWrapper>
              <Generator value={password} />
            </InputWrapper>
            <ButtonWrapper>
              <Button
                type="submit"
                style={{ backgroundColor: length > 0 ? "#ADEFD1" : "grey" }}
                onClick={() => {
                  errorToast();
                }}
              >
                Generate Password <AiFillLock />
              </Button>
              {length > 0 && (
                <ToastContainer transition={Zoom} autoClose={2000} limit={1} />
              )}
              <CopyToClipboard text={password}>
                <Button
                  style={{ backgroundColor: length > 0 ? "#ADEFD1" : "grey" }}
                  onClick={() => {
                    setCopied(true);
                    setLength("");
                    setPassword("");
                    successToast();
                  }}
                >
                  Copy
                </Button>
              </CopyToClipboard>
              {copied && (
                <ToastContainer transition={Slide} autoClose={2000} limit={1} />
              )}
            </ButtonWrapper>
            <CheckboxWrapper>
              <RadioButton
                type="radio"
                checked={includeLetters}
                onChange={(e) => setIncludeLetters(e.target.checked)}
                name="letters"
              />
              <Label>Add Letters</Label>

              <RadioButton
                type="radio"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                id="include-numbers"
                name="include-numbers"
              />
              <Label>Add Numbers</Label>
              <RadioButton
                type="radio"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                name="include-symbols"
              />
              <Label>Add Symbols</Label>
            </CheckboxWrapper>
          </form>
        </FormWrapper>
      </Container>
    </>
  );
};

export default GeneratePassword;
