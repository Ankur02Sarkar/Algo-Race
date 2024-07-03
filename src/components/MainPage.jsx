"use client";
import React, { useState } from "react";
import styled from "styled-components";
import SortingVisualizer from "./SortingVisualizer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VisualizerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  margin: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
`;

const Dropdown = styled.select`
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
  background-color: black;
  color: white;
`;

const MainPage = () => {
  const [speed, setSpeed] = useState(1);
  const [isSorting, setIsSorting] = useState(false);
  const [startSortingSignal, setStartSortingSignal] = useState(false);

  const handleStartSorting = () => {
    setStartSortingSignal((prev) => !prev); // Toggle signal to start sorting
    setIsSorting(true);
  };

  const handleSortingComplete = () => {
    setIsSorting(false);
  };

  return (
    <PageContainer>
      <Title>Sorting Visualizer</Title>
      <Controls>
        <Button onClick={handleStartSorting} disabled={isSorting}>
          Start Sorting
        </Button>
        <Dropdown
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        >
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
          <option value={0.5}>0.5x</option>
          <option value={0.25}>0.25x</option>
        </Dropdown>
      </Controls>
      <VisualizerContainer>
        <SortingVisualizer
          algorithm="bubbleSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="insertionSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="quickSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="selectionSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="combSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="bogoSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="bucketSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="mergeSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="heapSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="cocktailSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
        <SortingVisualizer
          algorithm="shellSort"
          speed={speed}
          startSortingSignal={startSortingSignal}
          onSortingComplete={handleSortingComplete}
        />
      </VisualizerContainer>
    </PageContainer>
  );
};

export default MainPage;
