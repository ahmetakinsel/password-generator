import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { Button, GeneratorButton } from "./Button/Button";
import Label from "./Label/Label";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const numbers = "0123456789";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const symbols = "0123456789!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";

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
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center mt-20 mb-8">
          <h3 className="text-center text-light text-2xl">
            Random Password Generator
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center">
          <form onSubmit={handleGeneratePassword}>
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <label className="mr-1 text-light text-base">
                  Choose Password Length:
                </label>
                <input
                  className="w-52 h-8 rounded border-border"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="Ex: 18"
                  type="text"
                />
              </div>
              <textarea
                className="w-70 h-32 rounded border-border"
                value={password}
              />
            </div>
            <div className="flex justify-center my-5 gap-5">
              <GeneratorButton
                type="submit"
                title="Generate Password"
                style={{ backgroundColor: length > 0 ? "#ADEFD1" : "grey" }}
                onClick={() => {
                  errorToast();
                }}
              >
                <AiFillLock />
              </GeneratorButton>
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
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                className="mt-px w-3 h-3"
                type="radio"
                checked={includeLetters}
                onClick={() => setIncludeLetters(!includeLetters)}
                name="include-letters"
                id="include-letters"
              />
              <Label title="Add Letters" for="include-letters" />

              <input
                className="mt-px w-3 h-3"
                type="radio"
                checked={includeNumbers}
                onClick={() => setIncludeNumbers(!includeNumbers)}
                id="include-numbers"
                name="include-numbers"
              />
              <Label title="Add Numbers" for="add-numbers" />
              <input
                className="mt-px w-3 h-3"
                type="radio"
                checked={includeSymbols}
                onClick={() => setIncludeSymbols(!includeSymbols)}
                name="include-symbols"
                id="include-symbols"
              />
              <Label title="Add Symbols" for="add-symbols" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GeneratePassword;
