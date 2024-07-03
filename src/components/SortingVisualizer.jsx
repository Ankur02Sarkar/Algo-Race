import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "./ui/button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 20px;
`;

const Bar = styled.div`
  width: 2rem;
  height: ${({ height }) => height}px;
  background-color: ${({ active }) => (active ? "red" : "blue")};
  margin: 0 2px;
  position: relative;
`;

const ValueLabel = styled.div`
  position: absolute;
  top: -20px;
  width: 100%;
  text-align: center;
  color: white;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Dropdown = styled.select`
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
  color: black;
`;

const generateRandomArray = (size) => {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 400) + 20
  );
};

const SortingVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    setArray(generateRandomArray(10));
  }, []);

  const bubbleSort = async (arr) => {
    let tempArr = [...arr];
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        if (tempArr[j] > tempArr[j + 1]) {
          let temp = tempArr[j];
          tempArr[j] = tempArr[j + 1];
          tempArr[j + 1] = temp;
        }
        setArray([...tempArr]);
        await new Promise((resolve) => setTimeout(resolve, 100 / speed));
      }
    }
    setActiveIndices([]);
    setIsSorting(false);
  };

  const startSorting = () => {
    setIsSorting(true);
    if (algorithm === "bubbleSort") {
      bubbleSort(array);
    }
  };

  return (
    <div>
      <Controls>
        <Button onClick={startSorting} disabled={isSorting}>
          Start Sorting
        </Button>

        <Dropdown
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        >
          <option value={0.25}>0.25x</option>
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
        </Dropdown>
      </Controls>
      <Container>
        {array.map((value, index) => (
          <Bar
            key={index}
            height={value}
            active={activeIndices.includes(index)}
          >
            <ValueLabel>{value}</ValueLabel>
          </Bar>
        ))}
      </Container>
    </div>
  );
};

export default SortingVisualizer;
